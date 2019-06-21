(module
  (import "js" "memory" (memory 1))
  (table 0 anyfunc)
  (export "effect" (func $effect))

  (func $localMin (param i32) (param i32) (result i32)
    (select
        (get_local 0)
        (get_local 1)
        (i32.lt_u (get_local 0) (get_local 1))
    )
  )

  (func $effect (param $ptr i32) (param $len i32) (param $delta i32)
    (local $end i32)
    (local $r i32)
    (local $g i32)
    (local $b i32)

    (local $rDelta i32)
    (set_local $rDelta (i32.mul (get_local $delta) (i32.const 2)))

    (set_local $end (i32.add (get_local $ptr) (i32.mul (get_local $len) (i32.const 4))))
      (block $break (loop $top
        (br_if $break (i32.eq (get_local $ptr) (get_local $end)))
        (set_local $r (i32.load offset=0 (get_local $ptr)))
        (set_local $g (i32.load offset=4 (get_local $ptr)))
        (set_local $b (i32.load offset=8 (get_local $ptr)))
        (set_local $r
            (call $localMin
                (i32.add (get_local $r) (get_local $rDelta))
                (i32.const 255)
            )
        )
        (set_local $g
            (call $localMin
                (i32.add (get_local $g) (get_local $delta))
                (i32.const 255)
            )
        )
        (i32.store (get_local $ptr) (get_local $r))
        (i32.store offset=4 (get_local $ptr) (get_local $g))

        (set_local $ptr (i32.add (get_local $ptr) (i32.const 16)))
        (br $top)
      )
    )

  )
)