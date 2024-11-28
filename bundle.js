"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var projectName = 'javascript-calculator';
var isOperator = /[x/+‑]/,
  endsWithOperator = /[x+‑/]$/,
  endsWithNegativeSign = /\d[x/+‑]{1}‑$/,
  clearStyle = {
    background: '#ac3939'
  },
  operatorStyle = {
    background: '#666666'
  },
  equalsStyle = {
    background: '#004466',
    position: 'absolute',
    height: 130,
    bottom: 5
  };
var Calculator = /*#__PURE__*/function (_React$Component) {
  _inherits(Calculator, _React$Component);
  var _super = _createSuper(Calculator);
  function Calculator(props) {
    var _this;
    _classCallCheck(this, Calculator);
    _this = _super.call(this, props);
    _this.state = {
      currentVal: '0',
      prevVal: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: ''
    };
    _this.maxDigitWarning = _this.maxDigitWarning.bind(_assertThisInitialized(_this));
    _this.handleOperators = _this.handleOperators.bind(_assertThisInitialized(_this));
    _this.handleEvaluate = _this.handleEvaluate.bind(_assertThisInitialized(_this));
    _this.initialize = _this.initialize.bind(_assertThisInitialized(_this));
    _this.handleDecimal = _this.handleDecimal.bind(_assertThisInitialized(_this));
    _this.handleNumbers = _this.handleNumbers.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Calculator, [{
    key: "maxDigitWarning",
    value: function maxDigitWarning() {
      var _this2 = this;
      this.setState({
        currentVal: 'Digit Limit Met',
        prevVal: this.state.currentVal
      });
      setTimeout(function () {
        return _this2.setState({
          currentVal: _this2.state.prevVal
        });
      }, 1000);
    }
  }, {
    key: "handleEvaluate",
    value: function handleEvaluate() {
      if (!this.state.currentVal.includes('Limit')) {
        var expression = this.state.formula;
        while (endsWithOperator.test(expression)) {
          expression = expression.slice(0, -1);
        }
        expression = expression.replace(/x/g, '*').replace(/‑/g, '-').replace('--', '+0+0+0+0+0+0+');
        var answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
        this.setState({
          currentVal: answer.toString(),
          formula: expression.replace(/\*/g, '⋅').replace(/-/g, '‑').replace('+0+0+0+0+0+0+', '‑-').replace(/(x|\/|\+)‑/, '$1-').replace(/^‑/, '-') + '=' + answer,
          prevVal: answer,
          evaluated: true
        });
      }
    }
  }, {
    key: "handleOperators",
    value: function handleOperators(e) {
      if (!this.state.currentVal.includes('Limit')) {
        var value = e.target.value;
        var _this$state = this.state,
          formula = _this$state.formula,
          prevVal = _this$state.prevVal,
          evaluated = _this$state.evaluated;
        this.setState({
          currentVal: value,
          evaluated: false
        });
        if (evaluated) {
          this.setState({
            formula: prevVal + value
          });
        } else if (!endsWithOperator.test(formula)) {
          this.setState({
            prevVal: formula,
            formula: formula + value
          });
        } else if (!endsWithNegativeSign.test(formula)) {
          this.setState({
            formula: (endsWithNegativeSign.test(formula + value) ? formula : prevVal) + value
          });
        } else if (value !== '‑') {
          this.setState({
            formula: prevVal + value
          });
        }
      }
    }
  }, {
    key: "handleNumbers",
    value: function handleNumbers(e) {
      if (!this.state.currentVal.includes('Limit')) {
        var _this$state2 = this.state,
          currentVal = _this$state2.currentVal,
          formula = _this$state2.formula,
          evaluated = _this$state2.evaluated;
        var value = e.target.value;
        this.setState({
          evaluated: false
        });
        if (currentVal.length > 21) {
          this.maxDigitWarning();
        } else if (evaluated) {
          this.setState({
            currentVal: value,
            formula: value !== '0' ? value : ''
          });
        } else {
          this.setState({
            currentVal: currentVal === '0' || isOperator.test(currentVal) ? value : currentVal + value,
            formula: currentVal === '0' && value === '0' ? formula === '' ? value : formula : /([^.0-9]0|^0)$/.test(formula) ? formula.slice(0, -1) + value : formula + value
          });
        }
      }
    }
  }, {
    key: "handleDecimal",
    value: function handleDecimal() {
      if (this.state.evaluated === true) {
        this.setState({
          currentVal: '0.',
          formula: '0.',
          evaluated: false
        });
      } else if (!this.state.currentVal.includes('.') && !this.state.currentVal.includes('Limit')) {
        this.setState({
          evaluated: false
        });
        if (this.state.currentVal.length > 21) {
          this.maxDigitWarning();
        } else if (endsWithOperator.test(this.state.formula) || this.state.currentVal === '0' && this.state.formula === '') {
          this.setState({
            currentVal: '0.',
            formula: this.state.formula + '0.'
          });
        } else {
          this.setState({
            currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
            formula: this.state.formula + '.'
          });
        }
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.setState({
        currentVal: '0',
        prevVal: '0',
        formula: '',
        currentSign: 'pos',
        lastClicked: '',
        evaluated: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "calculator"
      }, /*#__PURE__*/React.createElement(Formula, {
        formula: this.state.formula.replace(/x/g, '⋅')
      }), /*#__PURE__*/React.createElement(Output, {
        currentValue: this.state.currentVal
      }), /*#__PURE__*/React.createElement(Buttons, {
        decimal: this.handleDecimal,
        evaluate: this.handleEvaluate,
        initialize: this.initialize,
        numbers: this.handleNumbers,
        operators: this.handleOperators
      })));
    }
  }]);
  return Calculator;
}(React.Component);
var Buttons = /*#__PURE__*/function (_React$Component2) {
  _inherits(Buttons, _React$Component2);
  var _super2 = _createSuper(Buttons);
  function Buttons() {
    _classCallCheck(this, Buttons);
    return _super2.apply(this, arguments);
  }
  _createClass(Buttons, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        className: "jumbo",
        id: "clear",
        onClick: this.props.initialize,
        style: clearStyle,
        value: "AC"
      }, "AC"), /*#__PURE__*/React.createElement("button", {
        id: "divide",
        onClick: this.props.operators,
        style: operatorStyle,
        value: "/"
      }, "/"), /*#__PURE__*/React.createElement("button", {
        id: "multiply",
        onClick: this.props.operators,
        style: operatorStyle,
        value: "x"
      }, "x"), /*#__PURE__*/React.createElement("button", {
        id: "seven",
        onClick: this.props.numbers,
        value: "7"
      }, "7"), /*#__PURE__*/React.createElement("button", {
        id: "eight",
        onClick: this.props.numbers,
        value: "8"
      }, "8"), /*#__PURE__*/React.createElement("button", {
        id: "nine",
        onClick: this.props.numbers,
        value: "9"
      }, "9"), /*#__PURE__*/React.createElement("button", {
        id: "subtract",
        onClick: this.props.operators,
        style: operatorStyle,
        value: "\u2011"
      }, "\u2011"), /*#__PURE__*/React.createElement("button", {
        id: "four",
        onClick: this.props.numbers,
        value: "4"
      }, "4"), /*#__PURE__*/React.createElement("button", {
        id: "five",
        onClick: this.props.numbers,
        value: "5"
      }, "5"), /*#__PURE__*/React.createElement("button", {
        id: "six",
        onClick: this.props.numbers,
        value: "6"
      }, "6"), /*#__PURE__*/React.createElement("button", {
        id: "add",
        onClick: this.props.operators,
        style: operatorStyle,
        value: "+"
      }, "+"), /*#__PURE__*/React.createElement("button", {
        id: "one",
        onClick: this.props.numbers,
        value: "1"
      }, "1"), /*#__PURE__*/React.createElement("button", {
        id: "two",
        onClick: this.props.numbers,
        value: "2"
      }, "2"), /*#__PURE__*/React.createElement("button", {
        id: "three",
        onClick: this.props.numbers,
        value: "3"
      }, "3"), /*#__PURE__*/React.createElement("button", {
        className: "jumbo",
        id: "zero",
        onClick: this.props.numbers,
        value: "0"
      }, "0"), /*#__PURE__*/React.createElement("button", {
        id: "decimal",
        onClick: this.props.decimal,
        value: "."
      }, "."), /*#__PURE__*/React.createElement("button", {
        id: "equals",
        onClick: this.props.evaluate,
        style: equalsStyle,
        value: "="
      }, "="));
    }
  }]);
  return Buttons;
}(React.Component);
var Output = /*#__PURE__*/function (_React$Component3) {
  _inherits(Output, _React$Component3);
  var _super3 = _createSuper(Output);
  function Output() {
    _classCallCheck(this, Output);
    return _super3.apply(this, arguments);
  }
  _createClass(Output, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "outputScreen",
        id: "display"
      }, this.props.currentValue);
    }
  }]);
  return Output;
}(React.Component);
var Formula = /*#__PURE__*/function (_React$Component4) {
  _inherits(Formula, _React$Component4);
  var _super4 = _createSuper(Formula);
  function Formula() {
    _classCallCheck(this, Formula);
    return _super4.apply(this, arguments);
  }
  _createClass(Formula, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "formulaScreen"
      }, this.props.formula);
    }
  }]);
  return Formula;
}(React.Component);
ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.getElementById('app'));