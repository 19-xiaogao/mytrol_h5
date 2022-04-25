// 账号
let codeReg = /^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/;
// 电话
let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

// 必须为数字
let numberReg = /^\d+$|^\d+[.]?\d+$/;

// 密码
// let passwordReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/;//大写或小写  加数字
let passwordReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8,15}$/; //大写+小写+数字
// let passwordReg = /^(?![\d]+$)([^\u4e00-\u9fa5\s]){6,20}$/
// 登录密码
// let LoginPasswordReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/;

// 支付密码
let PayPasswordReg = /^\d{6,16}\b/;

// 联系人
let contactsReg = /^[\u0391-\uFFE5A-Za-z]+$/;

//身份证号码验证
let regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

//邮箱验证
let emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

//发件人姓名，必须中文
let nameReg = /[\u4e00-\u9fa5]/gm;

//QQ验证
let qqReg = /^[1-9][0-9]{4,}$/;

//只能由英文字母组成
let enReg = /^[a-z]+$/i;

// 验证网址
let urlReg = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;

//验证IP
let ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

// 验证授权服务
let accessReg = /^[a-z0-9]+$/i;
//银行卡验证
let card_number_reg = /^(\d{16}|\d{19})$/;
// 登录注册用户名
let usernameReg = /^[u4E00-u9FA5A-Za-z0-9_]{2,8}$/;

// name命名正则
let fieldNameReg = /^\s*$|^[a-z][a-z0-9_]+$/;

let FormValidate = (function () {
  function FormValidate() {}
  // From表单验证规则  可用于公用的校验部分
  FormValidate.Form = function () {
    return {
      // 账号的验证规则
      validateCode(rule=codeReg, value, callback) {
        if (!value) {
          return callback(new Error("请输入账号"));
        }
        if (!codeReg.test(value)) {
          return callback(new Error("账号必须为6-20位字母和数字组合"));
        } else {
          return callback();
        }
      },
      // 只能中文的验证
      validateChinese(rule=nameReg, value, callback) {
        if (value !== "") {
          if (!nameReg.test(value)) {
            return callback(new Error("必须为中文字符"));
          } else {
            return callback();
          }
        } else {
          return callback(new Error("不能为空"));
        }
      },
      // 只能英文的验证
      validateEnglish(rule=enReg, value, callback) {
        if (value !== "") {
          if (!enReg.test(value)) {
            return callback(new Error("必须为英文字符"));
          } else {
            return callback();
          }
        } else {
          return callback(new Error("不能为空"));
        }
      },
      // 只能数字的验证
      validateNumber(rule=numberReg, value, callback) {
        if (value !== "") {
          if (!numberReg.test(value)) {
            return callback(new Error("必须为数字"));
          } else {
            return callback();
          }
        } else {
          return callback(new Error("不能为空"));
        }
      },

      // 密码的验证
      validatePsdReg(rule=passwordReg, value, callback) {
        if (!value) {
          return callback(new Error("请输入密码"));
        }
        if (!passwordReg.test(value)) {
          return callback(new Error("请输入8-15位数字+大写字母+小写字母组合的密码"));
        } else {
          return callback();
        }
      },
      // 密码再次验证
      validateNewPsdReg(rule='', value, callback) {
        if (value !== this.numberValidateForm.password) {
          return callback(new Error("两次密码不一致"));
        } else {
          return callback();
        }
      },
      // 支付密码验证
      validatePayPsdReg(rule=PayPasswordReg, value, callback) {
        if (!value) {
          return callback(new Error("请输入密码"));
        }
        if (!PayPasswordReg.test(value)) {
          return callback(new Error("请输入6-16位数字、字母的密码"));
        } else {
          return callback();
        }
      },

      // 联系人
      validateContacts(rule=contactsReg, value, callback) {
        if (!value) {
          return callback(new Error("请输入联系人"));
        }
        if (!contactsReg.test(value)) {
          callback(new Error("联系人不可输入特殊字符"));
        } else {
          callback();
        }
      },

      // 邮箱的验证规则
      validateEmail(rule=emailReg, value, callback) {
        if (value !== "") {
          if (!emailReg.test(value)) {
            return callback(new Error("邮箱格式不正确"));
          } else {
            return callback();
          }
        } else {
          return callback(new Error("邮箱不能为空"));
        }
      },

      // 电话号码的验证
      validatePhone(rule=phoneReg, value, callback) {
        if (!value) {
          return callback(new Error("请输入手机号码"));
        }
        if (!phoneReg.test(value)) {
          return callback(new Error("手机格式不正确"));
        } else {
          return callback();
        }
      },

      // 身份证的验证规则
      validateID(rule=regId, value, callback) {
        if (!value) {
          return callback(new Error("身份证不能为空"));
        }
        if (!regId.test(value)) {
          return callback(new Error("请输入正确的二代身份证号码"));
        } else {
          return callback();
        }
      },

      // qq的验证规则
      validateQQ(rule=qqReg, value, callback) {
        if (!value) {
          return callback(new Error("qq号码不能为空"));
        }
        if (!qqReg.test(value)) {
          return callback(new Error("请输入正确的qq号码"));
        } else {
          return callback();
        }
      },
      // ip的验证规则
      validateIp(rule=ipReg, value, callback) {
        if (!value) {
          return callback(new Error("不能为空"));
        }
        if (!ipReg.test(value)) {
          return callback(new Error("请输入正确的IP"));
        } else {
          return callback();
        }
      },
      // url的验证规则
      validateUrl(rule=urlReg, value, callback) {
        if (!value) {
          return callback(new Error("不能为空"));
        }
        if (!urlReg.test(value)) {
          return callback(new Error("请输入正确的网址"));
        } else {
          return callback();
        }
      },
      // 验证授权服务规则
      validateAccess(rule=accessReg, value, callback) {
        if (!value) {
          return callback(new Error("不能为空"));
        }
        if (!accessReg.test(value)) {
          callback(new Error("只能由英文和数字组成"));
        } else {
          callback();
        }
      },
      // 银行卡号验证规则
      validateCardNum(rule=card_number_reg, value, callback) {
        if (value !== "") {
          if (!card_number_reg.test(value)) {
            return callback(new Error("银行卡号请输入16或者19位数字"));
          } else {
            return callback();
          }
        } else {
          return callback(new Error("银行卡不能为空"));
        }
      },
  
      // 登录/注册用户名 4-10位非中文
      validateUsername(rule='usernameReg', value, callback) {
        if (value !== "") {
          if (!usernameReg.test(value)) {
            return callback(new Error("用户名请输入2-8位字符"));
          } else {
            return callback();
          }
        } else {
          return callback(new Error("用户名不能为空"));
        }
      },
    };
  };
  // 导出当前(字段名，库名等)正则
  FormValidate.fieldNameReg = () => {
    return fieldNameReg;
  };

  return FormValidate;
})();

exports.FormValidate = FormValidate;
