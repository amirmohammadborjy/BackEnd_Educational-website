const Validator=require("fastest-validator");

const v=new Validator();

const schema={
    name:{type:"string",min:3,max:200},
    username:{type:"string",min:4,max:200},
    phonenumber:{type:"string",min:10,max:10},
    email:{type:"email",min:10,max:100},
    password:{type:"string",min:8,max:12},
    confirmpassword:{type:"equal",field:"password"},
    $$strict:true,
}

const check=v.compile(schema)

module.exports=check;