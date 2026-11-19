const toggle=document.getElementById('sidebarToggle'),sidebar=document.getElementById('workspaceSidebar');
if(toggle&&sidebar)toggle.addEventListener('click',()=>{const open=sidebar.classList.toggle('mobile-open');toggle.setAttribute('aria-expanded',String(open));});
