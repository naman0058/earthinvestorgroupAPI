let categories = []
let subcategories = []
let developers = []
let state = []

let table = '/admin/dashboard/store-listing/projects'



$.getJSON(`/api/get-country`, data => {
    subcategories = data
    fillDropDown('countryid',data, 'Choose Country', 0)
})


$.getJSON(`/api/get-developers`, data => {
    developers = data
    fillDropDown('developersid', [], 'Choose Developers', 0)
})

$('#countryid').change(() => {
    const filteredData = developers.filter(item => item.countryid == $('#countryid').val())
    fillDropDown('developersid', filteredData, 'Choose Developers', 0)
})





$.getJSON(`/api/get-state`, data => {
    state = data
    fillDropDown('stateid', [], 'Choose State', 0)
})

$('#countryid').change(() => {
    const filteredData = state.filter(item => item.countryid == $('#countryid').val())
    fillDropDown('stateid', filteredData, 'Choose State', 0)
    
})




function fillDropDown(id, data, label, selectedid = 0) {
    $(`#${id}`).empty()
    $(`#${id}`).append($('<option>').val("null").text(label))

    $.each(data, (i, item) => {
        if (item.id == selectedid) {
            $(`#${id}`).append($('<option selected>').val(item.id).text(item.name))
        } else {
            $(`#${id}`).append($('<option>').val(item.id).text(item.name))
        }
    })
}



$('#show').click(function(){

$.getJSON('/api/get-projects',data=>{
    categories = data
    makeTable(data)
})
})




function makeTable(categories){
    let table = ` <div class="table-responsive">

    <button type="button" id="back" class="btn btn-primary" style="margin:20px">BacK</button>
<table id="report-table" class="table  table-striped mb-0">
<thead>
<tr>
<th>Icon</th>
<th>Name</th>
<th>Country Name</th>
<th>State Name</th>

<th>Developer Name</th>
<th>Options</th>
</tr>
</thead>
<tbody>`

$.each(categories,(i,item)=>{
table+=`<tr>

<td>
<img src="/images/${item.icon}" class="img-fluid img-radius wid-40" alt="" style="width:30px;height:30px">
</td>
<td>${item.name}</td>
<td>${item.countryname}</td>
<td>${item.statename}</td>

<td>${item.developername}</td>



<td>
<a href="#!" class="btn btn-info btn-sm edits" id="${item.id}"><i class="feather icon-edit"></i>&nbsp;Edit </a>
<a href="#!" class="btn btn-info btn-sm updateimage"  id="${item.id}"><i class="feather icon-edit"></i>&nbsp;Edit Image </a>
<a href="#!" class="btn btn-danger btn-sm deleted" id="${item.id}"><i class="feather icon-trash-2"></i>&nbsp;Delete </a>
</td>
</tr>`
})
table+=`</tbody>
</table>
</div>

  
<!-- End Row -->`
    $('#result').html(table)
    $('#insertdiv').hide()
    $('#result').show()
}




$('#result').on('click', '.deleted', function() {
     const id = $(this).attr('id')
    
     $.get(`${table}/delete`,  { id }, data => {
        refresh()
    })
})




$('#pcountryid').change(() => {
    const filteredData = state.filter(item => item.countryid == $('#pcountryid').val())
    fillDropDown('pstateid', filteredData, 'Choose State', 0)
})


$('#pcountryid').change(() => {
    const filteredData = developers.filter(item => item.countryid == $('#pcountryid').val())
    fillDropDown('pdevelopersid', filteredData, 'Choose Developers', 0)
})



$('#result').on('click', '.edits', function() {
    const id = $(this).attr('id')
    const result = categories.find(item => item.id == id);
    fillDropDown('pcountryid', subcategories, 'Choose Country', result.countryid)
    $('#pdevelopersid').append($('<option>').val(result.developersid).text(result.developername))
    $('#pstateid').append($('<option>').val(result.stateid).text(result.statename))


  

    $('#editdiv').show()
    $('#result').hide()
    $('#insertdiv').hide() 
    $('#pid').val(result.id)
     $('#pname').val(result.name)
     $('#pstateid').val(result.stateid)

     $('#pdevelopersid').val(result.developersid)


   
 })



 $('#result').on('click', '.updateimage', function() {
    const id = $(this).attr('id')
    const result = categories.find(item => item.id == id);
    $('#peid').val(result.id)
})



 
$('#update').click(function(){  //data insert in database
    let updateobj = {
        id: $('#pid').val(),
        name: $('#pname').val(),
        countryid : $('#pcountryid').val(),
        developersid : $('#pdevelopersid').val(),
        stateid : $('#pstateid').val()
        }



    $.post(`${table}/update`, updateobj , function(data) {
       update()
    })
})






function refresh() 
{
    $.getJSON('/api/get-projects',data=>{
        makeTable(data)
    })
}
function update()
{
    $('#result').show()
    $('#editdiv').hide()
    $('#insertdiv').show() 
    refresh()
    refresh()
}

//================================Page Functionality=============================//
$('#editdiv').hide()
$('#updateimagediv').hide()

$('#result').on('click', '#back', function() {
    $('#result').hide()
    $('#insertdiv').show()
})

$('#back1').click(function(){
    $('#result').show()
    $('#insertdiv').hide()
    $('#editdiv').hide()
    $('#updateimagediv').hide()

})

$('#back2').click(function(){
    $('#result').show()
    $('#insertdiv').hide()
    $('#editdiv').hide()
    $('#updateimagediv').hide()
})

$('#result').on('click', '.updateimage', function() {
    $('#updateimagediv').show()
    $('#result').hide()
    $('#insertdiv').hide()
    $('#editdiv').hide()
})


