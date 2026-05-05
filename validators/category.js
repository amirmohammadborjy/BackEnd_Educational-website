const Validator=require("fastest-validator")

const v=new Validator();

const schema={
    title:{type:"string",min:3},
    link:{type:"string",min:2},
    $$strict:true
}

const check=v.compile(schema)

module.exports=check