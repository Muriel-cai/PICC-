export function export2Excel(columns,key,list,text){
    let ExcelText = text + ' '+ getData();
    require.ensure([], () => {
        const { export_json_to_excel } = require('./Export2Excel');
        let tHeader = columns;
        let filterVal = key;
        const data = list.map(v => filterVal.map(j => v[j]))
        export_json_to_excel(tHeader, data, ExcelText);
    })
};
function getData(){
    console.log(1111111);
    let date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
    var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
    var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
    return currentdate;
}

