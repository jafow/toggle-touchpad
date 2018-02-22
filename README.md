# toggle-touchpad
Turn on/off an `xinput` touchpad device

## Example

```bash
$ ttp --disable
```
Disables the touchpad; goodbye :mouse:!


```bash
$ ttp -e
```
Enables that touchpad back on. 

```bash
$ ttp --list
   ↳ DLL0704:01 03AB:12CD Touchpad             id=11   [slave  pointer  (2)]
```
List the xinput Device Id for the touchpad.

Can also use this in a script:
```javascript
var Toggle = require('toggle-touchpad')
var ttp = new Toggle()

if (!wantingToUseMouse) {
    ttp.disable() // touchpad disabled
} else {
    // do some code that uses the touchpad
}
```

## License
MIT
