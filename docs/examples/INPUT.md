# Input exmaple :

> `@lls/react-light-calendar` is delivred with only on component : a calendar.

As said, `@lls/react-light-calendar` doest propose input date component, but it still can be easily implemented with **pure CSS** or **JS** :

## Pure CSS example :
⚠️ Don't forget `tabIndex` attributs to enable `focus` and `blur` events.

```javascript
const InputCSS = () =>
  <div className='input-example' tabIndex={0}>
    <input type='text' className='input-text'/>
    <div tabIndex={0} className='calendar-wrapper'>
      <Calendar />
    </div>
  </div>
```

```css
.input-example { display: inline-block }
.calendar-wrapper { display: none }
.input-text:focus+.calendar-wrapper, .calendar-wrapper:active, .calendar-wrapper:focus { display: block }
```

## JS example :

```javacript
class InputJS extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  open = () => this.setState({ isOpen: true })

  close = e => {
    !e.currentTarget.contains(window.document.activeElement) && this.setState({ isOpen: false })
  }

  render = () =>
    <div style={{ display: 'inline-block' }} tabIndex={0} onFocus={this.open} onBlur={this.close}>
      <input type='text' />
      {this.state.isOpen && <Calendar />}
    </div>
}

```
