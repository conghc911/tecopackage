function pagination(curentPage,total){
    //curentPage Trang hien tai
    // total Tong so trang 
    var pagination = [curentPage];

    while(pagination.length < 5){
        let left = pagination[0] - 1;
        let right = pagination[pagination.length - 1] + 1;
        let added = false;
        if(left > 0){
            pagination.unshift(left);
            added = true;
        }
        if(right <= total){
            pagination.push(right);
            added = true;
        }
        if(!added){
            break;
        }
    }
    return pagination
}

function textConverter(text){
    let string = text.toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function textRuleConverter(ruleText){
    let ruleName = ruleText;
    if( ruleText == 'ADM'){
        ruleName = 'Admin'
    }
    if( ruleText == 'MOD'){
        ruleName = 'Moderator'
    }
    if( ruleText == 'CON'){
        ruleName = 'Contract Owner'
    }
    if( ruleText == 'SAL'){
        ruleName = 'Sale'
    }
    return ruleName;
}

function stateConverter(value){
    let result = '';
    switch(value){
      case 0:
        result = "Lỗi khởi tạo";
        break;
      case 1:
        result = "Đang đổ chuông";
        break;
      case 2:
        result = "Đang hội thoại";
        break;
      case 3:
        result = "Đã nghe máy";
        break;
      case 4:
        result = "Không nghe máy";
        break;
      case 5:
        result = "Máy bận";
        break; 
      case 6:
        result = "Lỗi cuộc gọi";
        break; 
      default:
        result = "Lỗi cuộc gọi";
        break; 
    }
    return result;
}
function numberConverter(number){
    // number = 200;
    let text = number;

    text = Math.floor(text / 60) + ( text % 60 >= 1 ? 1 : 0);
    // if(number == 0){
    //     text = '00:00';
    // }
    // if(number > 0 && number < 10){
    //     text = '00:0'+number;
    // }
    // if(number >=10 && number<60){
    //     text = '00:'+number;
    // }
    // if(number%60 == 0){
    //     text = number/60+ ':00';
    // }
    // if(number%60 != 0 && number > 60){
    //     var seconds = Math.floor(number % 60),
    //     minutes = Math.floor((number / (60)) % 60)
    //     text= minutes + ":" + seconds;
    // }
    return text;
}


function getUnique(arr){
    // let arr = [
    //     {id: 8, label: "Lò nướng"},
    //     {id: 9, label: "Thiet ke noi that chung cu cao cap"},
    //     {id: 10, label: "Nem Chan Ga Goi"},
    //     {id: 8, label: "Lò nướng"}
    // ];
    
    var result = arr.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id && obj.label === o.label)) {
          unique.push(o);
        }
        return unique;
    },[]);

    return result;
}

function genderConverter(gender){
    // console.log( gender );
    let text = null;
    if(gender == 'Male'){
        text = 'Nam'
    }else if(gender == 'Female'){
        text = 'Nữ'
    }else{
        text = 'Không xác định'
    }
    return text;
}

function getDateNext(date){
    // date = "2019-11-30";
    let today = new Date(date);
    let nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    var day = nextDay.getDate();
    var month = nextDay.getMonth() + 1;
    var year = nextDay.getFullYear();
    return year+'-'+month+'-'+day;
}

function getToday(){
    let today = new Date();

    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    return year+'-'+month+'-'+day;
}

function getLastWeek(){
    let today = new Date();
    let nextDay = new Date(today);
    nextDay.setDate(today.getDate() - 7);

    var day = nextDay.getDate();
    var month = nextDay.getMonth() + 1;
    var year = nextDay.getFullYear();
    return year+'-'+month+'-'+day;
}

function checkSyntax(string){
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/; 
    if(format.test(string)){ 
        return true; 
    } else { 
        return false; 
    } 
}

function checkNumber(number){
    let input = /^[0-9]*$/;
    if(input.test(number)){ 
        return true; 
    } else { 
        return false; 
    } 
}

function checkAlpha(string){
    let input = /^[a-zA-Z]*$/;
    if(input.test(string)){ 
        return true; 
    } else { 
        return false; 
    } 
}

function checkInputUser(string){
    let a = checkSyntax(string);
    let b = checkAlpha(string);
    if(a==true || b == false){
        return true
    }else{
        return false;
    }
}

module.exports = {
    pagination,textConverter,textRuleConverter,numberConverter,getUnique,genderConverter,getDateNext,getLastWeek,getToday,stateConverter,checkSyntax,checkNumber,checkAlpha,checkInputUser
}