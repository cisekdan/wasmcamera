(module
 (import "js" "memory" (memory 1))
 (table 0 anyfunc)
 (export "effect" (func $effect))
 (export "calculateGrayscale" (func $calculateGreyscale))
 (func $calculateGreyscale (param $r i32) (param $g i32) (param $b i32) (result i32)
    get_local $r
    get_local $g
    i32.add
    get_local $b
    i32.add
    i32.const 3
    i32.div_s
 )

 (func $effect (param $ptr i32) (param $len i32)
  (local $end i32)
  (local $newValue i32)
  (set_local $end (i32.add (get_local $ptr) (i32.mul (get_local $len) (i32.const 4))))
  (block $break (loop $top
      (br_if $break (i32.eq (get_local $ptr) (get_local $end)))
      (set_local $newValue (call $calculateGreyscale
        (i32.load offset=0 (get_local $ptr))
        (i32.load offset=4 (get_local $ptr))
        (i32.load offset=8 (get_local $ptr))
      ))
      (i32.store offset=0
        (get_local $ptr)
        (get_local $newValue)
      )
      (i32.store offset=4
        (get_local $ptr)
        (get_local $newValue)
      )
      (i32.store offset=8
        (get_local $ptr)
        (get_local $newValue)
      )
      (set_local $ptr (i32.add (get_local $ptr) (i32.const 16)))
      (br $top)
    )
  )
 )
)