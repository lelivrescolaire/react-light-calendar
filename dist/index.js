'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var times = _interopDefault(require('lodash.times'));
var React = require('react');
var React__default = _interopDefault(React);
var propTypes = require('prop-types');

var DAY_IN_MILLISECONDS = 1000 * 3600 * 24;

var initMonth = function initMonth(timestamp) {
  timestamp = timestamp || new Date().getTime(); // Force a default value if prop `value` is null
  var date = new Date(timestamp);
  var month = date.getMonth();
  var year = date.getFullYear();

  var firstMonthDay = new Date(year, month, 1);
  var firstMonthDayTime = firstMonthDay.getTime();

  var lastMonthDay = new Date(year, month + 1, 0);
  var lastMonthDayTime = lastMonthDay.getTime();

  // Always display 42 days, for mouth with 6 month who covered 6 differents weeks
  var startOffset = (firstMonthDay.getDay() || 7) - 1;

  var firstDayToDisplay = new Date(firstMonthDayTime).setDate(firstMonthDay.getDate() - startOffset);
  var lastDayToDisplay = new Date(firstDayToDisplay).setDate(new Date(firstDayToDisplay).getDate() + 41);

  return {
    firstMonthDay: firstMonthDayTime,
    lastMonthDay: lastMonthDayTime,
    firstDayToDisplay: firstDayToDisplay,
    lastDayToDisplay: lastDayToDisplay,
    month: month,
    year: year
  };
};

var parseRange = function parseRange(startDate, endDate, range) {
  return {
    startDate: endDate && range ? Math.min(startDate, endDate) : startDate,
    endDate: endDate && range && !dayAreSame(endDate, startDate) ? Math.max(startDate, endDate) : null
  };
};

var getDays = function getDays(firstDay, lastDay) {
  var firstDayDate = new Date(firstDay);
  var daysCount = Math.round((lastDay - firstDay) / DAY_IN_MILLISECONDS) + 1;
  return times(daysCount, function (i) {
    return new Date(firstDay).setDate(firstDayDate.getDate() + i);
  });
};

var dateIsBetween = function dateIsBetween(d, s, e) {
  var date = getDateWithoutTime(d);
  var start = getDateWithoutTime(s);
  var end = getDateWithoutTime(e);
  return date > start && date < end;
};

var dateIsOut = function dateIsOut(d, s, e) {
  var date = getDateWithoutTime(d);
  var start = getDateWithoutTime(s);
  var end = getDateWithoutTime(e);
  return date < start || date > end;
};

var getDateWithoutTime = function getDateWithoutTime(d) {
  var date = new Date(d);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
};

var dayAreSame = function dayAreSame(a, b) {
  return getDateWithoutTime(a) === getDateWithoutTime(b);
};

var formartTime = function formartTime(value) {
  return ('0' + value).slice(-2);
};

var extendTime = function extendTime(frm, to) {
  if (!frm || !to) return to;
  var date = new Date(frm);
  return new Date(new Date(to).setHours(date.getHours())).setMinutes(date.getMinutes());
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var DateDetails = function (_Component) {
  inherits(DateDetails, _Component);

  function DateDetails(props) {
    classCallCheck(this, DateDetails);

    var _this = possibleConstructorReturn(this, (DateDetails.__proto__ || Object.getPrototypeOf(DateDetails)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = _this.extractTime(props);
    return _this;
  }

  return DateDetails;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.componentWillReceiveProps = function (nextProps) {
    return _this2.setState(_this2.extractTime(nextProps));
  };

  this.extractTime = function (props) {
    var d = new Date(props.date);
    return { hours: d.getHours(), minutes: d.getMinutes() };
  };

  this.onHoursChange = function (e) {
    var _props = _this2.props,
        date = _props.date,
        onTimeChange = _props.onTimeChange;

    onTimeChange(new Date(date).setHours(e.target.value));
  };

  this.onMinutesChange = function (e) {
    var _props2 = _this2.props,
        date = _props2.date,
        onTimeChange = _props2.onTimeChange;

    onTimeChange(new Date(date).setMinutes(e.target.value));
  };

  this.render = function () {
    var _props3 = _this2.props,
        date = _props3.date,
        displayTime = _props3.displayTime,
        dayLabels = _props3.dayLabels,
        monthLabels = _props3.monthLabels;
    var _state = _this2.state,
        hours = _state.hours,
        minutes = _state.minutes;


    return React__default.createElement(
      'div',
      { className: 'rlc-date-details-wrapper' },
      React__default.createElement(
        'div',
        { className: 'rlc-date-details' },
        React__default.createElement(
          'div',
          { className: 'rlc-date-number' },
          date.getDate()
        ),
        React__default.createElement(
          'div',
          { className: 'rlc-date-day-month-year' },
          React__default.createElement(
            'div',
            { className: 'rlc-detail-day' },
            dayLabels[(date.getDay() || 7) - 1]
          ),
          React__default.createElement(
            'div',
            { className: 'rlc-detail-month-year' },
            monthLabels[date.getMonth()],
            ' ',
            React__default.createElement(
              'span',
              { className: 'rlc-detail-year' },
              date.getFullYear()
            )
          )
        )
      ),
      displayTime && React__default.createElement(
        'div',
        { className: 'rlc-date-time-selects' },
        React__default.createElement(
          'select',
          { onChange: _this2.onHoursChange, value: hours },
          times(24).map(function (hour) {
            return React__default.createElement(
              'option',
              { value: hour, key: hour },
              formartTime(hour)
            );
          })
        ),
        React__default.createElement(
          'span',
          { className: 'rlc-time-separator' },
          ':'
        ),
        React__default.createElement(
          'select',
          { onChange: _this2.onMinutesChange, value: minutes },
          times(60).map(function (minute) {
            return React__default.createElement(
              'option',
              { value: minute, key: minute },
              formartTime(minute)
            );
          })
        )
      )
    );
  };
};

DateDetails.propTypes = {
  date: propTypes.instanceOf(Date),
  displayTime: propTypes.bool,
  dayLabels: propTypes.arrayOf(propTypes.string),
  monthLabels: propTypes.arrayOf(propTypes.string),
  onTimeChange: propTypes.func
};

function Details(_ref) {
  var startDate = _ref.startDate,
      endDate = _ref.endDate,
      dayLabels = _ref.dayLabels,
      monthLabels = _ref.monthLabels,
      displayTime = _ref.displayTime,
      onStartTimeChange = _ref.onStartTimeChange,
      onEndTimeChange = _ref.onEndTimeChange;

  return React__default.createElement(
    'div',
    { className: 'rlc-details' },
    startDate && React__default.createElement(DateDetails, {
      dayLabels: dayLabels,
      monthLabels: monthLabels,
      date: new Date(startDate),
      displayTime: displayTime,
      onTimeChange: onStartTimeChange
    }),
    endDate && React__default.createElement(DateDetails, {
      dayLabels: dayLabels,
      monthLabels: monthLabels,
      date: new Date(endDate),
      displayTime: displayTime,
      onTimeChange: onEndTimeChange
    })
  );
}

Details.propTypes = {
  startDate: propTypes.number,
  endDate: propTypes.number,
  dayLabels: propTypes.arrayOf(propTypes.string),
  monthLabels: propTypes.arrayOf(propTypes.string),
  displayTime: propTypes.bool,
  onStartTimeChange: propTypes.func,
  onEndTimeChange: propTypes.func
};

var MonthWrapper = function MonthWrapper(_ref) {
  var monthLabels = _ref.monthLabels,
      month = _ref.month,
      year = _ref.year,
      prevYear = _ref.prevYear,
      prevMonth = _ref.prevMonth,
      nextYear = _ref.nextYear,
      nextMonth = _ref.nextMonth;
  return React__default.createElement(
    'div',
    { className: 'rlc-month-and-year-wrapper' },
    React__default.createElement(
      'div',
      { className: 'rlc-navigation-button-wrapper rlc-prevs' },
      React__default.createElement(
        'div',
        { className: 'rlc-navigation-button rlc-prev-year', onClick: prevYear },
        '<<'
      ),
      React__default.createElement(
        'div',
        { className: 'rlc-navigation-button rlc-prev-month', onClick: prevMonth },
        '<'
      )
    ),
    React__default.createElement(
      'div',
      { className: 'rlc-month-and-year' },
      monthLabels[month],
      ' ',
      React__default.createElement(
        'span',
        null,
        year
      )
    ),
    React__default.createElement(
      'div',
      { className: 'rlc-navigation-button-wrapper rlc-nexts' },
      React__default.createElement(
        'div',
        { className: 'rlc-navigation-button rlc-next-month', onClick: nextMonth },
        '>'
      ),
      React__default.createElement(
        'div',
        { className: 'rlc-navigation-button rlc-next-year', onClick: nextYear },
        '>>'
      )
    )
  );
};

MonthWrapper.propTypes = {
  monthLabels: propTypes.arrayOf(propTypes.string),
  month: propTypes.number,
  year: propTypes.number,
  prevYear: propTypes.func,
  prevMonth: propTypes.func,
  nextYear: propTypes.func,
  nextMonth: propTypes.func
};

var Calendar = function (_Component) {
  inherits(Calendar, _Component);

  function Calendar(props) {
    classCallCheck(this, Calendar);

    var _this = possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.componentWillReceiveProps = function (nextProps) {
      return _this.setState(parseRange(nextProps.startDate, nextProps.endDate, nextProps.range));
    };

    _this.onClickDay = function (day) {
      var range = _this.props.range;
      var _this$state = _this.state,
          startDate = _this$state.startDate,
          endDate = _this$state.endDate;

      if (range) {
        if (!startDate) _this.update({ startDate: day });else {
          var sDate = day < startDate ? day : startDate;
          var eDate = day < startDate ? endDate : day;
          _this.update({
            startDate: extendTime(startDate, sDate),
            endDate: extendTime(endDate, eDate)
          });
        }
      } else _this.update({ startDate: extendTime(startDate, day), endDate: null });
    };

    _this.onStartTimeChange = function (date) {
      return _this.update({ startDate: date });
    };

    _this.onEndTimeChange = function (date) {
      return _this.update({ endDate: date });
    };

    _this.changeMonth = function (_ref) {
      var _ref$yearOffset = _ref.yearOffset,
          yearOffset = _ref$yearOffset === undefined ? 0 : _ref$yearOffset,
          _ref$monthOffset = _ref.monthOffset,
          monthOffset = _ref$monthOffset === undefined ? 0 : _ref$monthOffset;
      var _this$state2 = _this.state,
          year = _this$state2.year,
          month = _this$state2.month;

      var date = new Date(year + yearOffset, month + monthOffset, 1).getTime();
      _this.setState(initMonth(date));
    };

    _this.prevYear = function () {
      return _this.changeMonth({ yearOffset: -1 });
    };

    _this.prevMonth = function () {
      return _this.changeMonth({ monthOffset: -1 });
    };

    _this.nextYear = function () {
      return _this.changeMonth({ yearOffset: 1 });
    };

    _this.nextMonth = function () {
      return _this.changeMonth({ monthOffset: 1 });
    };

    _this.update = function (_ref2) {
      var startDate = _ref2.startDate,
          endDate = _ref2.endDate;

      _this.props.onChange(startDate || _this.props.startDate, endDate || _this.props.endDate);
    };

    _this.getClassNames = function (day) {
      var _this$state3 = _this.state,
          firstMonthDay = _this$state3.firstMonthDay,
          lastMonthDay = _this$state3.lastMonthDay,
          startDate = _this$state3.startDate,
          endDate = _this$state3.endDate;
      var disableDates = _this.props.disableDates;


      var conditions = defineProperty({
        'rlc-day-disabled': disableDates(day),
        'rlc-day-today': dayAreSame(day, getDateWithoutTime(new Date())),
        'rlc-day-inside-selection': dateIsBetween(day, startDate, endDate),
        'rlc-day-out-of-month': dateIsOut(day, firstMonthDay, lastMonthDay),
        'rlc-day-selected': !endDate && dayAreSame(startDate, day),
        'rlc-day-start-selection': endDate && dayAreSame(startDate, day),
        'rlc-day-end-selection': endDate && dayAreSame(endDate, day)
      }, 'rlc-day-' + day, true);

      var classnames = Object.entries(conditions).reduce(function (prev, _ref3) {
        var _ref4 = slicedToArray(_ref3, 2),
            className = _ref4[0],
            valid = _ref4[1];

        return valid ? prev + ' ' + className : prev;
      }, '');

      return classnames || 'Day_default';
    };

    _this.render = function () {
      var _this$state4 = _this.state,
          firstDayToDisplay = _this$state4.firstDayToDisplay,
          lastDayToDisplay = _this$state4.lastDayToDisplay,
          startDate = _this$state4.startDate,
          endDate = _this$state4.endDate,
          month = _this$state4.month,
          year = _this$state4.year;
      var _this$props = _this.props,
          disableDates = _this$props.disableDates,
          displayTime = _this$props.displayTime,
          dayLabels = _this$props.dayLabels,
          monthLabels = _this$props.monthLabels,
          custom = _this$props.custom;


      return React__default.createElement(
        'div',
        _extends({ className: 'rlc-calendar' }, custom),
        React__default.createElement(Details, {
          startDate: startDate,
          endDate: endDate,
          dayLabels: dayLabels,
          monthLabels: monthLabels,
          displayTime: displayTime,
          onStartTimeChange: _this.onStartTimeChange,
          onEndTimeChange: _this.onEndTimeChange
        }),
        React__default.createElement(MonthWrapper, {
          monthLabels: monthLabels,
          month: month,
          year: year,
          prevYear: _this.prevYear,
          prevMonth: _this.prevMonth,
          nextYear: _this.nextYear,
          nextMonth: _this.nextMonth
        }),
        React__default.createElement(
          'div',
          { className: 'rlc-days-label' },
          dayLabels.map(function (label) {
            return React__default.createElement(
              'div',
              { className: 'rlc-day-label', key: label.toLowerCase() },
              label.slice(0, 2)
            );
          })
        ),
        React__default.createElement(
          'div',
          { className: 'rlc-days' },
          getDays(firstDayToDisplay, lastDayToDisplay).map(function (day) {
            return React__default.createElement(
              'div',
              {
                className: 'rlc-day ' + _this.getClassNames(day),
                key: day,
                onClick: function onClick() {
                  return !disableDates(day) && _this.onClickDay(day);
                }
              },
              new Date(day).getDate()
            );
          })
        )
      );
    };

    _this.state = _extends({}, initMonth(_this.props.startDate), parseRange(props.startDate, props.endDate, props.range));
    return _this;
  }

  return Calendar;
}(React.Component);

Calendar.defaultProps = {
  startDate: null,
  endDate: null,
  onChange: function onChange() {},
  range: false,
  disableDates: function disableDates() {
    return false;
  },
  displayTime: false,
  dayLabels: [],
  monthLabels: [],
  custom: {}
};

Calendar.propTypes = {
  startDate: propTypes.number,
  endDate: propTypes.number,
  onChange: propTypes.func,
  range: propTypes.bool,
  disableDates: propTypes.func,
  displayTime: propTypes.bool,
  dayLabels: propTypes.arrayOf(propTypes.string).isRequired,
  monthLabels: propTypes.arrayOf(propTypes.string).isRequired,
  custom: propTypes.object
};

module.exports = Calendar;