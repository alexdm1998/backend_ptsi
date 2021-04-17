console.log(window.location.hostname);

fetch("/UNICEF/Datastructure").then(
    res => {
        res.json().then(
            data => {
                var newData = JSON.parse(data);
                console.log(newData);
                if (newData.length > 0) {

                    var temp = "";
                    newData.forEach((itemData) => {
                        temp += "<tr>";
                        temp += "<td>" + itemData[0]+ "</td>";
                        temp += "<td>" + itemData[1] + "</td>";
                        temp += "<td>" + itemData[2] + "</td>";
                        temp += '<td> <button class=table-button onclick="GetDfID_Table(this)"></button></td>';
                    });
                    document.getElementById('data').innerHTML = temp;
                }
            }
        )
    }
)


function GetDfID_Table(buttonRef){
    var DfId = $(buttonRef).closest('tr').find('td:nth-child(1)').text();
    var DfAgency = $(buttonRef).closest('tr').find('td:nth-child(3)').text();
    window.location.replace(`/UNICEF/Dataflow/${DfId}/${DfAgency}`);
}