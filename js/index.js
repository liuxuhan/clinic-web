var patients_ = [{ id: '1', status: 'danger', name: 'aaa' }, { id: '2', status: 'danger', name: 'bbb' },
    { id: '3', status: 'danger', name: 'ccc' }, { id: '4', status: 'warning', name: 'ddd' }, { id: '5', status: 'warning', name: 'eee' },
    { id: '6', status: 'warning', name: 'fff' }, { id: '7', status: 'danger', name: 'ggg' }, { id: '9', status: 'normal', name: 'hhh' },
    { id: '9', status: 'normal', name: 'iii' }, { id: '10', status: 'normal', name: 'jjj' }, { id: '11', status: 'normal', name: 'kkk' },
    { id: '12', status: 'warning', name: 'lll' }, { id: '13', status: 'danger', name: 'mmm' }, { id: '14', status: 'normal', name: 'nnn' },
    { id: '15', status: 'normal', name: 'ooo' }, { id: '16', status: 'normal', name: 'ppp' }, { id: '17', status: 'normal', name: 'qqq' }
];


$(function() {
    bindEvent();
    displayPatientList(patients_);
});

function bindEvent() {
    $('#search-patient-box').on('input', function() {
        var list_ = onSearchPatientBoxChange(this);
        list_ = this.value === "" ? patients_ : list_;
        displayPatientList(list_);
    });

    $('.dropdown-item').click(function() {
        updateDropdownButton(this);
    });

    $('#iconColor').on('change', function() {
        changeIconColor(this);
    })

    $('#filterModal').on('hidden.bs.modal', function(e) {
        resetFilterForm();
    })
    $('div.toolbox-filter-all').find('label').click(function(){
        onExistingFilterClick(this);
    });
}

function onExistingFilterClick(el){
    
}


function resetFilterForm() {
    $('#ageInput').val('');
    $('#weightInput').val('');
    $('#diagnoseInput').val('');
    $('#durationInput').val('');
    $('#collapseIcon').collapse('hide');
    $('label.icon').removeClass('active');
}

function changeIconColor(el) {
    var newClass = 'btn-outline-' + el.value;
    $('label.icon').removeClass().addClass('btn icon ' + newClass);
}

function updateDropdownButton(el) {
    var val = el.getAttribute('value');
    var dropdownBtn = el.parentElement.previousElementSibling;
    dropdownBtn.innerText = val;
}

function onSearchPatientBoxChange(el) {
    var input = el.value;
    var displayList = [];
    patients_.forEach(function(patient) {
        if (patient.id === input || patient.name.includes(input)) {
            displayList.push(patient);
        }
    });
    return displayList;
}

function onFilterClick(filter) {
    // console.log('You click ' + filter.getAttribute('filterName') + ' filter');
    // $(filter).toggleClass('active');
}

function displayPatientList(list) {
    $('#patient-list').empty();
    var html = '';
    list.forEach(function(patient) {
        var statusClass = '';
        if (patient.status === 'danger') {
            statusClass = 'list-group-item-danger';
        } else if (patient.status === 'warning') {
            statusClass = 'list-group-item-warning';
        }
        html += '<a href="#" class="list-group-item list-group-item-action ' + statusClass + '" id="patient-' + patient.id + '">' + patient.name + '(' + patient.id + ')</a>';
    })
    $('#patient-list').html(html);
}
// function onAddFilterClick(){
//  console.log('add filter');
// }