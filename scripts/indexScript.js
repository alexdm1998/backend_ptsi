fetch("/UNICEF/Datastructure").then(
    res => {
        res.json().then(
            data => {
                var newData = JSON.parse(data);
                if (newData.length > 0) {
                    var temp = "";
                    newData.forEach((itemData) => {
                        temp += "<tr>";
                        temp += "<td>" + itemData[0]+ "</td>";
                        temp += "<td>" + itemData[1] + "</td>";
                        temp += "<td>" + itemData[2] + "</td>";
                        temp += `<td> <button class=table-button onclick=window.location.href="/UNICEF/Dataflow/${itemData[0]}/${itemData[2]}"></button></td>`;
                    });
                    document.getElementById('data').innerHTML = temp;
                }
            }
        )
    }
)