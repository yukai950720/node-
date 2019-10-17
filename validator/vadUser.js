const validator=require("validator");
const isEmpty=require("./isEmpty");

module.exports=function VadUser(value){
    const errors={}

    value.email=isEmpty(value.email)?"":value.email;
    value.name=isEmpty(value.name)?"":value.name;
    value.password=isEmpty(value.password)?"":value.password;
    value.password2=isEmpty(value.password2)?"":value.password2;

    if (validator.isEmpty(value.email)) {
        errors.email="您的邮箱为空"
    }
    if (validator.isEmpty(value.name)) {
        errors.name="您的姓名为空"
    }
    if (validator.isEmpty(value.password)) {
        errors.password="您的密码为空"
    }
    if (validator.isEmpty(value.password2)) {
        errors.password2="您的确认密码为空"
    }

    if (!validator.isEmail(value.email)) {
        errors.email="您的邮箱不合法"
    }

    return{
        errors,
        isEmpty:!isEmpty(errors)
    }
}