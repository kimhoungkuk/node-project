var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

var ContractsSchema = new Schema({
    title   : String, // 제목
    write_name   : String, // 작성자
    content : String, // 내용
    create_dt : { // 작성일
        type : Date,
        default : Date.now()
    },
    modify_dt : { // 수정일
        type : Date,
        default : Date.now()
    }
});

// virtual 변수는 호출되면 실행하는 함수
// Object create 의 get과 set과 비슷함
// set은 변수의 값을 바꾸거나 셋팅하면 호출
// get은 getDate변수를 호출하는 순간 날짜 월일이 찍힌다.
ContractsSchema.virtual('getDate').get(function(){
    var createDate = new Date(this.create_dt);

    return {
        year : createDate.getFullYear(),
        month : ( '0'+ (createDate.getMonth()+1) ).slice(-2),
        day : ( '0' + createDate.getDate() ).slice(-2)
    }

});

// 1씩 증가하는 primary Key 를 만든다
// model : 생성할 collection 이름
// field : primary key , startAt : 1부터 시작
ContractsSchema.plugin(autoIncrement.plugin,
     { model : 'contracts' , field : 'id' , startAt : 1 });

module.exports = mongoose.model('contracts',ContractsSchema);