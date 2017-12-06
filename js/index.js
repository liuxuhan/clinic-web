var patients_ = [{
        id: '1',
        status: 'danger',
        name: 'aaa'
    }, {
        id: '2',
        status: 'danger',
        name: 'bbb'
    },
    {
        id: '3',
        status: 'danger',
        name: 'ccc'
    }, {
        id: '4',
        status: 'warning',
        name: 'ddd'
    }, {
        id: '5',
        status: 'warning',
        name: 'eee'
    },
    {
        id: '6',
        status: 'warning',
        name: 'fff'
    }, {
        id: '7',
        status: 'danger',
        name: 'ggg'
    }, {
        id: '9',
        status: 'normal',
        name: 'hhh'
    },
    {
        id: '9',
        status: 'normal',
        name: 'iii'
    }, {
        id: '10',
        status: 'normal',
        name: 'jjj'
    }, {
        id: '11',
        status: 'normal',
        name: 'kkk'
    },
    {
        id: '12',
        status: 'warning',
        name: 'lll'
    }, {
        id: '13',
        status: 'danger',
        name: 'mmm'
    }, {
        id: '14',
        status: 'normal',
        name: 'nnn'
    },
    {
        id: '15',
        status: 'normal',
        name: 'ooo'
    }, {
        id: '16',
        status: 'normal',
        name: 'ppp'
    }, {
        id: '17',
        status: 'normal',
        name: 'qqq'
    }
];

var element_;

$(function() {
    displayPatientList(patients_);
    loadInboxItems();
    intElements();
    bindEvent();
});

function loadInboxItems() {
    var item ='';
        for (var i = 1; i < 20; i++) {
            item += '<tr><td class="col-subject">subject</td><td class="col-body">body</td>' +
                '<td class="col-button"><button type="button" class="btn btn-secondary btn-sm mail-delete-btn"><i class="material-icons">delete</i>' +
                '</button><button type="button" class="btn btn-secondary btn-sm mail-star-btn"><i class="material-icons">star</i>' +
                '</button></td><td class="col-label">label</td></tr>';
        }
    $('tbody.inbox-table-body').html(item);
}

function intElements() {
    element_ = {
        filterForm: {
            $filterName: $('input#filterName'),
            $iconGroup: $('div.icon-group'),
            $saveFilterBtn: $('button#saveFilterBtn'),
            $iconColorSelect: $('select#iconColor')
        },
        sidemenu: {
            $allFilters: $('div#all-filters')
        },
        $filterModal: $('#filterModal'),
        inbox: {
            $starBtn: $('button.mail-star-btn'),
            $deleteBtn: $('button.mail-delete-btn')
        }
    };
}

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
        changeIconsColor(this);
    })

    element_.$filterModal.on('hidden.bs.modal', function(e) {
        resetFilterForm();
    })
    $('div.toolbox-filter-all').find('label').click(function(event) {
        onExistingFilterClick(this, event);
    });
    element_.filterForm.$saveFilterBtn.click(function() {
        onSaveFilterBtnClick(this);
    });
    element_.filterForm.$filterName.on('input', function() {
        validFilterSaveBtn(false);
    });
    element_.filterForm.$iconGroup.find('label').click(function() {
        validFilterSaveBtn(true);
    });
    element_.inbox.$starBtn.on('click', function() {
        onInboxItemStarClick(this);
    });
    element_.inbox.$deleteBtn.on('click', function() {
        onInboxItemDeleteClick(this);
    });
}

function onInboxItemStarClick(el) {
    $(el).toggleClass('btn-secondary').toggleClass('btn-danger');
}

function onInboxItemDeleteClick(el) {
    $(el).parents('tr').remove();
}

function onSaveFilterBtnClick(el) {
    var selectedIcon = element_.filterForm.$iconGroup.find('label.active')[0];
    var cln = selectedIcon.cloneNode(true);
    var filterName = element_.filterForm.$filterName.val();
    var iconName = cln.getElementsByTagName("input")[0];
    iconName.setAttribute('id', filterName);
    $(cln).removeClass('icon active');
    $(cln).click(function(event) {
        onExistingFilterClick(this, event);
    });
    appendIconToIconGroup(cln);
    element_.$filterModal.modal('hide');
}

function appendIconToIconGroup(el) {
    if (typeof(cln) === 'string') {

    }
    element_.sidemenu.$allFilters.append(el);
}

function validFilterSaveBtn(iconClicked) {
    var name = element_.filterForm.$filterName.val();
    var selectIcon = element_.filterForm.$iconGroup.find('label').hasClass('active');
    var enable = name !== '' && (iconClicked || selectIcon);
    element_.filterForm.$saveFilterBtn.prop('disabled', !enable);
}

function onExistingFilterClick(el, event) {
    var isActive = $(el).hasClass('active');
    console.log(isActive);
    if (isActive) {
        $(el).removeClass('active');
        event.preventDefault();
        event.stopPropagation();
    }
}


function resetFilterForm() {
    $('#ageInput').val('');
    $('#weightInput').val('');
    $('#diagnoseInput').val('');
    $('#durationInput').val('');
    $('#collapseIcon').collapse('hide');
    $('label.icon').removeClass('active');
    element_.filterForm.$iconColorSelect.val('dark');
    element_.filterForm.$filterName.val('');
    element_.filterForm.$saveFilterBtn.prop('disabled', true);
    changeIconsColor({
        value: 'dark'
    });
}

function changeIconsColor(el) {
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
        html += '<a data-toggle="list" href="#" class="list-group-item list-group-item-action ' + statusClass + '" id="patient-' + patient.id + '">' + patient.name + '(' + patient.id + ')</a>';
    })
    $('#patient-list').html(html);
}
// function onAddFilterClick(){
//  console.log('add filter');
// }