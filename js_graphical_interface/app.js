const data = [{
    'folder': true,
    'title': 'Grow',
    'children': [{
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'English',
        'children': [{
          'title': 'Present_Perfect.txt'
        }]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Soft',
    'children': [{
        'folder': true,
        'title': 'NVIDIA',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'folder': true,
    'title': 'Doc',
    'children': [{
      'title': 'project_info.txt'
    }]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');
rootNode.innerHTML = '<ul class="root_list" id="root_list"></ul>';
let root_list = document.getElementById('root_list');
let l_item = [];
let title = [];
let icon = [];
let open_flag = false;
let child = [];
rootNode.setAttribute('oncontextmenu', 'return false;');

for (let i = 0; i < data.length; i++) {
  l_item[i] = document.createElement('li');
  if (data[i].folder === true) {
    createItem(i);
    icon[i].innerHTML = 'folder';
    icon[i].id = 'folder';
    l_item[i].addEventListener('mousedown', openFolder);

  } else {
    createItem(i);
    icon[i].innerHTML = 'insert_drive_file';
    icon[i].id = 'file';
  }

  l_item[i].addEventListener('mousedown', showMenu);
  l_item[i].appendChild(icon[i]);
  l_item[i].appendChild(title[i]);
  root_list.appendChild(l_item[i]);

}

function createItem(i) {
  icon[i] = document.createElement('i');
  title[i] = document.createElement('p');
  icon[i].className = 'material-icons';
  title[i].innerHTML = data[i].title;
}

function openFolder(e) {
  if (e.which !== 1) {
    return;
  }
  if (open_flag === true && this.nextSibling.nodeName === 'UL') {
    this.nextSibling.remove();
    open_flag = false;
    this.firstChild.innerHTML = 'folder';
    return;
  }
  open_flag = true;

  this.firstChild.innerHTML = 'folder_open';
  let index = data.findIndex(e => e.title === this.lastChild.innerHTML);
  child = data[index].children;

  if (child === null) {
    this.parentNode.insertBefore(document.createTextNode('Folder is empty'), this.nextSibling);
  } else {
    let inner_list = document.createElement('ul');
    let inner_item = [];
    let inner_icon = [];
    let inner_title = [];

    for (let i = 0; i < child.length; i++) {
      inner_icon[i] = document.createElement('i');
      inner_title[i] = document.createElement('p');
      inner_item[i] = document.createElement('li');
      inner_icon[i].className = 'material-icons';
      inner_title[i].innerHTML = child[i].title;

      if (child[i].folder === true) {
        inner_icon[i].innerHTML = 'folder';
        inner_icon[i].id = 'folder';
        inner_item[i].addEventListener('mousedown', openFolder);
      } else {
        inner_icon[i].innerHTML = 'insert_drive_file';
        inner_icon[i].id = 'file';
      }

      inner_item[i].addEventListener('mousedown', showMenu);
      inner_item[i].appendChild(inner_icon[i]);
      inner_item[i].appendChild(inner_title[i]);
      inner_list.appendChild(inner_item[i]);
      this.parentNode.insertBefore(inner_list, this.nextSibling);


    }
  }

}

function showMenu(e) {
  const three = 3;
  if (e.which === three) {
    let c_menu = document.createElement('ul');
    c_menu.id = 'c_menu';
    c_menu.innerHTML = '<li id="rename">Rename</li><li id="delete">Delete</li>';
    c_menu.style.left = e.clientX + 'px';
    c_menu.style.top = e.clientY + 'px';
    let this_item = this;
    let input = '';
    rootNode.appendChild(c_menu)
    let rename = document.getElementById('rename');

    rename.addEventListener('mousedown', function () {
      c_menu.remove();
      let old_value = this_item.lastChild.innerHTML;
      this_item.lastChild.remove();
      input = document.createElement('input');
      input.id = 'input_field';
      input.value = old_value;
      this_item.appendChild(input);

      input.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
          let p_title = document.createElement('p');
          p_title.innerHTML = input.value;
          input.remove();
          this_item.appendChild(p_title);
        }
      });

    });




    let deleteElement = document.getElementById('delete');
    deleteElement.addEventListener('mousedown', function () {
      this_item.remove();
      c_menu.remove();
    });

  }
}
