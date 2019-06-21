(module
    (import "js" "memory" (memory 1))
    (table 0 anyfunc)
    (export "effect" (func $effect))

    (func $calculateAverage (param $ptr i32) (param $width i32) (result i32)
        (local $sum i32)
        (local $previousRowPtr i32)
        (local $nextRowPtr i32)
        (set_local $previousRowPtr (i32.sub (get_local $ptr) (i32.mul (get_local $width) (i32.const 16))))
        (set_local $nextRowPtr (i32.add (get_local $ptr) (i32.mul (get_local $width) (i32.const 16))))

        (set_local $sum (i32.add (get_local $sum) (i32.load offset=0 (i32.sub(get_local $previousRowPtr) (i32.const 16)))))
        (set_local $sum (i32.add (get_local $sum) (i32.load offset=0 (get_local $previousRowPtr))))
        (set_local $sum (i32.add (get_local $sum) (i32.load offset=16 (get_local $previousRowPtr))))

        (set_local $sum (i32.add (get_local $sum) (i32.load offset=0 (i32.sub(get_local $ptr) (i32.const 16)))))
        (set_local $sum (i32.add (get_local $sum) (i32.load offset=0 (get_local $ptr))))
        (set_local $sum (i32.add (get_local $sum) (i32.load offset=16 (get_local $ptr))))

        (set_local $sum (i32.add (get_local $sum) (i32.load offset=0 (i32.sub(get_local $nextRowPtr) (i32.const 16)))))
        (set_local $sum (i32.add (get_local $sum) (i32.load offset=0 (get_local $nextRowPtr))))
        (set_local $sum (i32.add (get_local $sum) (i32.load offset=16 (get_local $nextRowPtr))))

        (i32.div_s (get_local $sum) (i32.const 9))
    )

    (func $effect (param $ptr i32) (param $len i32) (param $width i32)
        (local $end i32)
        (local $r i32)
        (local $g i32)
        (local $b i32)
        (set_local $ptr
            (i32.add
                (i32.mul (get_local $width) (i32.const 16))
                (i32.const 16)
            )
        )
        (set_local $end
            (i32.sub
                (i32.mul
                    (get_local $len)
                    (i32.const 4)
                )
                (i32.mul
                    (get_local $width)
                    (i32.const 32)
                )
            )
        )
        (block $break (loop $top
            (br_if $break (i32.eq (get_local $ptr) (get_local $end)))
            (set_local $r (call $calculateAverage (get_local $ptr) (get_local $width)))
            (set_local $g (call $calculateAverage (i32.add (i32.const 4) (get_local $ptr)) (get_local $width)))
            (set_local $b (call $calculateAverage (i32.add (i32.const 8) (get_local $ptr)) (get_local $width)))

            (i32.store offset=0
                (get_local $ptr)
                (get_local $r)
            )
            (i32.store offset=4
                (get_local $ptr)
                (get_local $g)
            )
            (i32.store offset=8
                (get_local $ptr)
                (get_local $b)
            )
            (set_local $ptr (i32.add (get_local $ptr) (i32.const 16)))
            (br $top)
        ))

    )
)