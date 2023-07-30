window.onload = function () {
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        var JSON_formData = Object.fromEntries(formData);

        addElement(JSON_formData);
    }); 

    setFormData();
}

async function setFormData() {
    document.getElementById("loadingDiv").style.display = "block";
    await setDataTable();
    document.getElementById("loadingDiv").style.display = "none";
}

function createDataTable(tableData) {
    entriesTable = $('#dataTable').DataTable({
        data: tableData,
        destroy: true,
        "searching": false,
        "paging": false,
        "info": false,
        "columnDefs": [
            {
                "targets": [0],
                "visible": false
            }
        ]
    });
}

function setDataTable() {
    return axios.get(
        '/api/getData',
        data = {
        }
    ).then(function (response) {
        var rows = response.data;
        var tableData = [];

        rows.forEach(element => {
            var tempRow = [element.cells[0].value, element.cells[1].value, element.cells[2].value];
            tableData.push(tempRow);
        });

        createDataTable(tableData);
    }).catch(function (error) {
        console.error(error);
    });
}

function addElement(formData) {
    var infoModal = new bootstrap.Modal(document.getElementById('infoModal'), {
        keyboard: false
    });

    $('#infoModal').on('hide.bs.modal', function () {
        location.reload();
        window.location = "/";
    });

    var infoModalText = document.getElementById("infoModalText");
    document.getElementById("loadingDiv").style.display = "block";

    var data = {
        "attributeValue": formData.attributeValue
    };

    return axios.post(
        '/api/addElement', data
    ).then(function (response) {
        document.getElementById("loadingDiv").style.display = "none";
        infoModalText.innerHTML = "Success!</br>Element signature: <b>" + response.data.instanceNumber + "</b>";
        infoModal.show();
    })
    .catch(function (error) {
        document.getElementById("loadingDiv").style.display = "none";
        infoModalText.innerHTML = "Error occured.</br>" + error;
        infoModal.show();
    });
}