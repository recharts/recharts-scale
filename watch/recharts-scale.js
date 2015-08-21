(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["recharts-scale"] = factory();
	else
		root["recharts-scale"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/watch/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function identity(x) {
	  return +x;
	}
	
	var scales = {};
	
	function getTickValues(cormin, cormax, tickCount) {
	  // 刻度的数量不能小于1
	  if (tickCount < 1) {
	    tickCount = 2;
	  }
	
	  var corstep,
	      tmpstep,
	      tmp,
	      //幂
	  step,
	      min,
	      max,
	      middle,
	      log = Math.log,
	      pow = Math.pow,
	      ary = [],
	      fixlen = 0,
	      isFloat = function isFloat(num) {
	    return (/^([+-]?)\d*\.\d+$/.test(num)
	    );
	  };
	
	  // if (cormax < cormin) return;
	  if (cormax === cormin && cormin > 0) {
	    cormin = 0;
	    cormax = cormax * 2;
	  } else if (cormax === cormin && cormin < 0) {
	    cormax = 0;
	    cormin = cormin * 2;
	  } else if (cormax === cormin) {
	    cormin = 0;
	    cormax = 100;
	  }
	
	  // 获取间隔宽度
	  corstep = (cormax - cormin) / (tickCount - 1);
	  // 获取间隔宽度的位数
	  tmp = Math.floor(log(corstep) / log(10)) + 1;
	
	  tmpstep = corstep / pow(10, tmp);
	
	  if (tmpstep > 0 && tmpstep <= 0.1) {
	
	    tmpstep = 0.1;
	  } else if (tmpstep > 0.1 && tmpstep <= 0.2) {
	
	    tmpstep = 0.2;
	  } else if (tmpstep > 0.2 && tmpstep <= 0.25) {
	
	    tmpstep = 0.25;
	  } else if (tmpstep > 0.25 && tmpstep <= 0.5) {
	
	    tmpstep = 0.5;
	  } else {
	
	    tmpstep = 1;
	  }
	
	  step = tmpstep * pow(10, tmp);
	  // 中值的偏移量
	  var middleOffset = (cormax + cormin) / 2 % step;
	
	  middle = (cormax + cormin) / 2 - middleOffset;
	
	  min = max = middle;
	
	  while (min > cormin) {
	    min -= step;
	  }
	
	  while (max < cormax) {
	    max += step;
	  }
	  // 当middleOffset = 0时，生成的刻度的数量等于 tickCount
	  // 当刻度的区间长度和原始的区间长度的差值 大于 刻度向下偏移的值 时，生成的刻度数量等于 tickCount - 1
	  // 当刻度的区间长度和原始的区间长度的差值 小于或等于 刻度向下偏移的值 时，生成的刻度数量等于 tickCount
	  // 下面对这两种情况进行修正， 达到最后得到的刻度的个数 等于 tickCount 的 效果
	  if ((tickCount - 1) * step - (cormax - cormin) > middleOffset && middleOffset > 0) {
	    max += step;
	  }
	
	  if (isFloat(step)) {
	    var stepstr = step + '';
	    if (stepstr.indexOf('.') > -1) {
	      fixlen = stepstr.split('.')[1].length > 4 ? 4 : stepstr.split('.')[1].length;
	    }
	  }
	  for (var i = min; i <= max; i += step) {
	    ary.push(+parseFloat(i).toFixed(fixlen));
	  }
	
	  // 过滤数据 如果全部为正 则删除负值 若全部为负 则删除正数
	  // if (self.isNagitive) {
	  //  for (i in ary) {
	  //    ary[i] > 0 && ary.splice(i, 1)
	  //  }
	  // } else if (self.isPositive) {
	  //  for (i in ary) {
	  //    ary[i] < 0 && ary.splice(i, 1)
	  //  }
	  // }
	  return ary;
	}
	
	exports['default'] = getTickValues;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=recharts-scale.js.map