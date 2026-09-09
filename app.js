const modules = [
  { id: 'installation', number: '01', icon: '▣', color: '#6356d8', fade: '#eeeaff', title: 'Windows Server 2025 Installation', short: 'Install the server and edit essential sign-in and shutdown policies.', slides: 46, pdf: 'Module 01 Windows Server 2025 Installation.pdf', topics: [
    ['1.1', 'Client / Server Networking', 'Understand how a server provides resources, services, and security for clients.', 'Concept', 'Server manages shared resources, services, users, and network security.'],
    ['1.2', 'Network Operating System', 'Know why a network operating system connects devices and manages requests.', 'Concept', 'A Network Operating System manages LAN resources and client requests.'],
    ['2.1', 'Installation requirements', 'Prepare hardware before installing Windows Server 2025.', 'Checklist', '64-bit CPU (2+ cores recommended) · 4 GB RAM minimum for Desktop Experience · 32 GB storage minimum · UEFI/Secure Boot.'],
    ['2.2', 'Install Windows Server 2025', 'Choose Desktop Experience, partition Disk 0, install, create the Administrator password, and verify the system.', 'Install route', 'Boot setup → choose language → select Windows Server 2025 Standard Evaluation (Desktop Experience) → partition Disk 0 → Install → set Administrator password.'],
    ['3.1', 'Disable Shutdown Event Tracker', 'Stop the reason prompt that appears before server shutdown or restart in a practice environment.', 'Run / route', '<code>gpedit.msc</code> → Computer Configuration → Administrative Templates → System → Display Shutdown Event Tracker → <b>Disabled</b> → restart.'],
    ['3.2', 'Do not require Ctrl + Alt + Del', 'Change the interactive logon requirement for a lab environment only.', 'Run / route', '<code>secpol.msc</code> → Security Settings → Local Policies → Security Options → Interactive logon: Do not require CTRL+ALT+DEL → <b>Enabled</b> → restart.'],
    ['3.3', 'Shutdown without logging in', 'Show the shutdown button at the Windows sign-in screen.', 'Run / route', '<code>gpedit.msc</code> → Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options → Shutdown: Allow system to be shut down without having to log on → <b>Enabled</b> → restart.']
  ]},
  { id: 'active-directory', number: '02', icon: '⌘', color: '#d09a26', fade: '#fff3d5', title: 'Active Directory', short: 'Prepare, install, manage, back up, and restore Active Directory.', slides: 64, pdf: 'Module 02 Active Directory.pdf', topics: [
    ['1.1', 'Domain Controller and Active Directory', 'Learn the role of a Domain Controller: authentication, authorization, and centralized directory management.', 'Concept', 'A Domain Controller hosts Active Directory and centrally manages domain users, computers, security, and access.'],
    ['2.1', 'Prepare the server', 'Give the server a fixed identity before promoting it to a Domain Controller.', 'Checklist', 'Set static IP <b>192.168.1.2/24</b> · hostname <b>WIN-SERVER</b> · domain <b>makara.com</b> · preferred DNS <b>192.168.1.2</b>.'],
    ['2.2', 'Change hostname and IP address', 'Rename the server and set IPv4 details before AD DS installation.', 'Run / route', '<code>sysdm.cpl</code> → Computer Name → Change → enter <b>WIN-SERVER</b> → restart. For IPv4: <code>ncpa.cpl</code> → Ethernet Properties → Internet Protocol Version 4 (TCP/IPv4) → Properties.'],
    ['3.1', 'Install and promote AD DS', 'Add the Active Directory Domain Services role and create a new forest.', 'Server Manager route', 'Manage → Add Roles and Features → Active Directory Domain Services → Add Features → Install → notification flag → Promote this server to a domain controller → Add a new forest → root domain <b>makara.com</b> → set recovery password → Install.'],
    ['3.2', 'Create a domain user', 'Create user accounts in the domain Users container.', 'Run / route', '<code>dsa.msc</code> → expand <b>makara.com</b> → Users → right-click → New → User → enter name and logon name → set password → Finish.'],
    ['3.3', 'Join a computer to the domain', 'Point the client at the DC DNS server, then join makara.com and sign in as the new user.', 'Run / route', '<code>ncpa.cpl</code> → IPv4 Properties → set preferred DNS to <b>192.168.1.2</b>. Then <code>sysdm.cpl</code> → Computer Name → Change → Domain: <b>makara.com</b> → enter domain-admin credentials → restart.'],
    ['4.1', 'Back up and restore AD', 'Install Windows Server Backup, back up System State, and restore in AD repair mode.', 'Recovery route', 'Add Roles and Features → Features → Windows Server Backup. Back up <b>System state</b>. To restore: <code>msconfig</code> → Boot → Safe boot → Active Directory repair → restart → Windows Server Backup → Recover → System state → Original location.']
  ]},
  { id: 'ou-users', number: '03', icon: '♧', color: '#2b9a83', fade: '#dcf5ed', title: 'Manage OU and Users', short: 'Organize users, control logon behavior, and delegate administration.', slides: 42, pdf: 'Module 03 Manage OU and Users.pdf', topics: [
    ['1.1', 'Organizational Units (OUs)', 'Use OUs to organize domain objects, apply Group Policy, and delegate administration.', 'Concept', 'An OU groups users, computers, groups, printers, and other objects so administration and policy can be scoped.'],
    ['1.2', 'Create and delete an OU', 'Create an OU from the domain and safely remove it when needed.', 'Run / route', '<code>dsa.msc</code> → right-click domain → New → Organizational Unit → name it → OK. To delete: View → Advanced Features → OU Properties → uncheck <b>Protect object from accidental deletion</b> → delete.'],
    ['2.3', 'Set password policy', 'Set a minimum length and require complex passwords at the domain level.', 'Teacher answer', '<code>gpmc.msc</code> → Forest → Domains → <b>makara.com</b> → right-click Default Domain Policy → Edit → Computer Configuration → Policies → Windows Settings → Security Settings → Account Policies → Password Policy → Minimum password length → Properties → enter <b>12</b> → OK. Then enable <b>Password must meet complexity requirements</b> and run <code>gpupdate /force</code>.'],
    ['2.4', 'Create users in an OU', 'Create a user directly inside the correct OU.', 'Run / route', '<code>dsa.msc</code> → expand domain → choose OU → right-click → New → User → fill in user details → set password → Finish.'],
    ['2.5', 'Disable cached logons', 'Prevent the computer from using previously cached interactive sign-ins.', 'Run / route', '<code>gpedit.msc</code> → Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options → Interactive logon: Number of previous logons to cache → set <b>0</b> → <code>gpupdate /force</code>.'],
    ['2.6', 'Set logon hours and workstations', 'Limit when and where an account can sign in.', 'Run / route', '<code>dsa.msc</code> → user Properties → Account → <b>Logon Hours</b> (blue = permitted, white = denied). For computers: Account → <b>Log On To</b> → This following computers → add client name.'],
    ['3.2', 'Delegate OU control', 'Allow a delegated account to create, delete, and manage users within an OU.', 'Run / route', '<code>dsa.msc</code> → right-click OU → Delegate Control → Next → Add user → select <b>Create, delete, and manage user accounts</b> → Finish.'],
    ['3.3', 'Change server login rights', 'Control who may log on locally or shut down the server.', 'Run / route', '<code>gpmc.msc</code> → Default Domain Policy → Edit → Computer Configuration → Policies → Windows Settings → Security Settings → Local Policies → User Rights Assignment → Allow log on locally / Shut down the system → add <b>Administrators</b>.']
  ]},
  { id: 'profiles', number: '04', icon: '◉', color: '#d07068', fade: '#ffe7e3', title: 'User Profiles and Home Directory', short: 'Configure roaming, home, and mandatory user profiles.', slides: 50, pdf: 'Module 04 User Profiles and Home Directory.pdf', topics: [
    ['1.1', 'Profile types', 'Compare Local, Roaming, and Mandatory profiles.', 'Concept', '<b>Local:</b> stored on one computer. <b>Roaming:</b> stored on the server and downloaded at sign-in. <b>Mandatory:</b> a read-only roaming profile; changes are discarded after sign-out.'],
    ['1.2', 'Create a roaming profile', 'Share a server folder and assign a profile path to the user.', 'Run / route', 'Create and share <b>HomeDir</b> with appropriate Read/Write access. Then <code>dsa.msc</code> → user Properties → Profile → Profile path: <code>\\WIN-SERVER\\HomeDir\\%username%</code> → Apply.'],
    ['1.3', 'Verify a roaming profile', 'Confirm the profile type on a client computer.', 'Run / route', 'On client: <code>sysdm.cpl</code> → Advanced → User Profiles → Settings → find the configured user; the type should show <b>Roaming</b>.'],
    ['2.2', 'Admin access to HomeDir', 'Give an administrator Full control over a user’s home folder.', 'Folder route', 'Open <code>\\WIN-SERVER\\HomeDir</code> → right-click user folder → Properties → Security → Edit → Add → Administrator → allow <b>Full control</b> → OK.'],
    ['2.3', 'Map a home drive', 'Map a drive letter to the user’s network home directory.', 'Run / route', '<code>dsa.msc</code> → user Properties → Profile → Home folder → Connect (choose X:, Y:, or Z:) → To: <code>\\WIN-SERVER\\HomeDir\\userID.V6</code> → Apply.'],
    ['2.4', 'Copy a roaming profile user', 'Copy a user, then change the profile path and home-drive ID for the new account.', 'Practice route', 'Copy the existing user → set the new password → user Properties → Profile → update the profile path and home-folder destination for the new ID.'],
    ['3.1', 'Create a mandatory profile', 'Create the MAN share, assign the profile path, then change NTUSER.DAT to NTUSER.MAN.', 'Key route', 'Share <b>MAN</b> → assign <code>\\WIN-SERVER\\MAN\\%username%</code> in Profile path → create the profile folder → reveal hidden items and file extensions → rename <code>NTUSER.DAT</code> to <code>NTUSER.MAN</code> → run <code>gpupdate /force</code>.'],
    ['3.2', 'Verify a mandatory profile', 'Confirm the Mandatory type, make a desktop change, sign out, and confirm the change did not persist.', 'Run / route', '<code>sysdm.cpl</code> → Advanced → User Profiles → Settings → confirm <b>Mandatory</b>. Make a desktop change, sign out, then sign in again to test persistence.']
  ]}
];

const commands = [
  { command:'gpedit.msc', tool:'Local Group Policy Editor', category:'Policies', task:'Edit local computer policies, shutdown settings, and cached-logon settings.' },
  { command:'gpmc.msc', tool:'Group Policy Management', category:'Policies', task:'Edit domain policies such as the Default Domain Policy and password rules.' },
  { command:'gpupdate /force', tool:'Force Group Policy update', category:'Policies', task:'Immediately refresh Group Policy after changing a policy.' },
  { command:'secpol.msc', tool:'Local Security Policy', category:'Security', task:'Open local security options such as the Ctrl + Alt + Del sign-in requirement.' },
  { command:'dsa.msc', tool:'Active Directory Users and Computers', category:'Active Directory', task:'Create users and OUs; edit user account, Profile, and Logon Hours settings.' },
  { command:'sysdm.cpl', tool:'System Properties', category:'System', task:'Rename or domain-join a computer; check advanced User Profiles settings.' },
  { command:'ncpa.cpl', tool:'Network Connections', category:'Network', task:'Open adapter properties and configure static IPv4/DNS settings.' },
  { command:'msconfig', tool:'System Configuration', category:'Recovery', task:'Set Safe boot with Active Directory repair mode before an AD restore.' },
  { command:'\\\\WIN-SERVER\\HomeDir', tool:'Open HomeDir share', category:'Profiles', task:'Open the shared user-home-directory location directly from Run or File Explorer.' },
  { command:'\\\\WIN-SERVER\\MAN', tool:'Open Mandatory share', category:'Profiles', task:'Open the mandatory-profile share to manage the profile folder and NTUSER.MAN.' }
];

const questions = [
  { module:'MODULE 03 · POLICIES', q:'Your teacher asks: “Set the minimum password length to 12 for the domain.” What should you open first?', choices:['gpedit.msc','gpmc.msc','secpol.msc','dsa.msc'], answer:1, explain:'Use gpmc.msc because this is a domain password policy. Edit Default Domain Policy, then go to Computer Configuration → Policies → Windows Settings → Security Settings → Account Policies → Password Policy → Minimum password length.' },
  { module:'MODULE 02 · ACTIVE DIRECTORY', q:'Before joining a client to makara.com, which setting is most important on the client network adapter?', choices:['Preferred DNS points to 192.168.1.2','Set the gateway to 127.0.0.1','Disable IPv4','Use a random public DNS server'], answer:0, explain:'The client must use the Domain Controller/DNS server (192.168.1.2 in the lesson) as its preferred DNS so it can find the domain.' },
  { module:'MODULE 04 · PROFILES', q:'Which file must be renamed to make a roaming profile mandatory?', choices:['NTUSER.MAN to NTUSER.DAT','NTUSER.DAT to NTUSER.MAN','HomeDir to MAN','Profile.V6 to Profile.MAN'], answer:1, explain:'After creating the profile folder and revealing hidden items and file extensions, rename NTUSER.DAT to NTUSER.MAN.' },
  { module:'MODULE 01 · SYSTEM', q:'Which command opens the Local Security Policy used to change the Ctrl + Alt + Del sign-in requirement?', choices:['secpol.msc','sysdm.cpl','msconfig','ncpa.cpl'], answer:0, explain:'Open secpol.msc, then Security Settings → Local Policies → Security Options → Interactive logon: Do not require CTRL+ALT+DEL.' },
  { module:'MODULE 03 · USERS', q:'Where do you configure the days and times when a domain user is permitted to log on?', choices:['User Properties → Account → Logon Hours','Default Domain Policy → Password Policy','Network Connections → IPv4','System Properties → Advanced'], answer:0, explain:'In Active Directory Users and Computers, open the user’s Properties, select Account, then choose Logon Hours.' },
  { module:'MODULE 02 · RECOVERY', q:'Which msconfig Safe boot option is used before restoring Active Directory System State?', choices:['Minimal','Alternate shell','Active Directory repair','Network'], answer:2, explain:'Use msconfig → Boot → Safe boot → Active Directory repair, then restart and use Windows Server Backup to recover System State.' },
  { module:'MODULE 04 · PROFILES', q:'What is the correct roaming profile path pattern used in the lesson?', choices:['C:\\HomeDir\\%username%','\\\\WIN-SERVER\\HomeDir\\%username%','\\\\Client\\Profiles\\%username%','C:\\Users\\%username%'], answer:1, explain:'The profile is stored on the server share: \\WIN-SERVER\\HomeDir\\%username%. The username variable creates a personal location for each user.' },
  { module:'MODULE 03 · OUS', q:'What should you do before deleting an OU that has deletion protection enabled?', choices:['Disable the domain controller','Uncheck Protect object from accidental deletion','Delete all users first','Run gpupdate /force'], answer:1, explain:'In AD Users and Computers, enable View → Advanced Features, open the OU Properties, and uncheck Protect object from accidental deletion before deleting it.' },
  { module:'MODULE 01 · SYSTEM', q:'What setting lets the server shut down from the logon screen?', choices:['Display Shutdown Event Tracker = Disabled','Shutdown: Allow system to be shut down without having to log on = Enabled','Do not require CTRL+ALT+DEL = Enabled','Minimum password length = 0'], answer:1, explain:'In the relevant Security Options policy, enable “Shutdown: Allow system to be shut down without having to log on,” then restart.' },
  { module:'MODULE 02 · DOMAIN', q:'Which tool can you use to create a user in the makara.com domain?', choices:['dsa.msc','msconfig','gpedit.msc','notepad.exe'], answer:0, explain:'dsa.msc opens Active Directory Users and Computers. Expand the domain, choose Users or an OU, then New → User.' }
];

let activeModule = modules[0];
let activeFilter = 'All';
let quizSet = [];
let questionIndex = 0;
let score = 0;
let answered = false;

const $ = (selector, parent = document) => parent.querySelector(selector);
const escapeHTML = (value) => value.replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

function renderModules() {
  $('#module-nav').innerHTML = modules.map(module => `<a href="#module-view" class="module-link ${module.id === activeModule.id ? 'active' : ''}" data-module="${module.id}"><span class="module-number">${module.number}</span><span>${module.title.replace('Windows Server 2025 ', '')}</span><small>${module.slides}</small></a>`).join('');
  $('#module-grid').innerHTML = modules.map(module => `<a href="#module-view" class="module-card" data-module="${module.id}" style="--module-color:${module.color};--module-fade:${module.fade}"><span class="module-symbol">${module.icon}</span><span class="module-index">MODULE ${module.number}</span><h3>${module.title}</h3><p>${module.short}</p><footer>${module.slides} slides · Review module →</footer></a>`).join('');
  document.querySelectorAll('[data-module]').forEach(item => item.addEventListener('click', () => showModule(item.dataset.module)));
}

function showModule(id) {
  activeModule = modules.find(module => module.id === id) || modules[0];
  renderModules();
  const module = activeModule;
  $('#module-content').innerHTML = `
    <header class="module-header" style="--active-color:${module.color}">
      <div><span class="module-kicker">MODULE ${module.number} · ${module.slides} SLIDES</span><h1>${module.title}</h1><p>${module.short} Open each topic to practise the route and the words you should use when explaining it.</p></div>
      <a class="source-link" href="${encodeURI(module.pdf)}" target="_blank" rel="noopener">Open original lesson PDF ↗</a>
    </header>
    <div class="module-summary">
      <div class="summary-card"><span>TOPICS</span><b>${module.topics.length} review cards</b></div>
      <div class="summary-card"><span>BEST FOR</span><b>${module.topics[0][2]}</b></div>
      <div class="summary-card"><span>STUDY METHOD</span><b>Command → route → result</b></div>
    </div>
    <div class="lesson-layout" style="--active-color:${module.color}">
      <div class="lesson-list">${module.topics.map((topic,index) => `<details class="lesson-card" ${index === 0 ? 'open' : ''}><summary><span class="lesson-no">${topic[0]}</span><h3>${topic[1]}</h3></summary><div class="lesson-body"><p>${topic[2]}</p><div class="route"><label>${topic[3].toUpperCase()}</label><p>${topic[4]}</p></div></div></details>`).join('')}</div>
      <aside class="module-side"><div class="side-note"><h3>How to answer a practical question</h3><ul><li>Say the command or tool first.</li><li>Give the folders or tabs in order.</li><li>Name the exact setting and value.</li><li>Say how you apply or test it.</li></ul></div><div class="side-note"><h3>Quick command</h3><p>For this module, start with:</p><code>${module.id === 'installation' ? 'gpedit.msc / secpol.msc' : module.id === 'active-directory' ? 'dsa.msc / sysdm.cpl' : module.id === 'ou-users' ? 'gpmc.msc / dsa.msc' : 'sysdm.cpl / dsa.msc'}</code></div></aside>
    </div>`;
  switchView('module-view');
}

function renderCommands() {
  const categories = ['All', ...new Set(commands.map(item => item.category))];
  $('#command-filters').innerHTML = categories.map(category => `<button class="filter ${activeFilter === category ? 'active' : ''}" data-filter="${category}">${category}</button>`).join('');
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter; renderCommands(); }));
  const query = $('#command-search').value.toLowerCase().trim();
  const shown = commands.filter(item => (activeFilter === 'All' || item.category === activeFilter) && `${item.command} ${item.tool} ${item.category} ${item.task}`.toLowerCase().includes(query));
  $('#command-grid').innerHTML = shown.length ? shown.map(item => `<article class="command-card"><span class="category">${item.category.toUpperCase()}</span><code>${item.command}</code><button class="copy-command" data-command="${escapeHTML(item.command)}">Copy</button><h3>${item.tool}</h3><p>${item.task}</p></article>`).join('') : '<p class="empty-state">No command found. Try another keyword.</p>';
  document.querySelectorAll('.copy-command').forEach(button => button.addEventListener('click', async () => { try { await navigator.clipboard.writeText(button.dataset.command); button.textContent = 'Copied'; setTimeout(() => button.textContent = 'Copy', 1400); } catch { button.textContent = 'Select text'; } }));
}

function switchView(viewId) {
  document.querySelectorAll('.view').forEach(view => view.classList.toggle('active', view.id === viewId));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.view === viewId));
  const labels = { dashboard:['STUDY DASHBOARD','Your Windows Server review'], shortcuts:['COMMAND GUIDE','Run commands and administration tools'], practice:['PRACTICE LAB','Practical Windows Server review'], 'module-view':['LESSON REVIEW',activeModule.title] };
  $('#eyebrow').textContent = labels[viewId][0]; $('#page-title').textContent = labels[viewId][1];
  if (viewId === 'shortcuts') renderCommands();
  document.querySelector('.app-shell').classList.remove('menu-open');
  window.scrollTo({ top:0, behavior:'smooth' });
}

function openRoute() {
  const dialog = $('#route-dialog');
  $('#dialog-content').innerHTML = `<div class="dialog-content"><p class="overline">MODEL EXAM ANSWER</p><h2>Set the minimum password length to 12</h2><p>Say this clearly: “I will open Group Policy Management, edit the Default Domain Policy, and configure the Minimum password length setting.”</p><code class="answer-command">Win + R → gpmc.msc</code><div class="answer-steps"><div class="answer-step"><span>1</span><div>Expand <b>Forest</b> → <b>Domains</b> → <b>makara.com</b>.</div></div><div class="answer-step"><span>2</span><div>Right-click <b>Default Domain Policy</b> and choose <b>Edit</b>.</div></div><div class="answer-step"><span>3</span><div>Open <b>Computer Configuration</b> → <b>Policies</b> → <b>Windows Settings</b> → <b>Security Settings</b> → <b>Account Policies</b> → <b>Password Policy</b>.</div></div><div class="answer-step"><span>4</span><div>Open <b>Minimum password length</b> → <b>Properties</b> → enter <b>12</b> → <b>OK</b>.</div></div><div class="answer-step"><span>5</span><div>For a stronger policy, enable <b>Password must meet complexity requirements</b>, then run <b>gpupdate /force</b>.</div></div></div></div>`;
  dialog.showModal();
}

function startQuiz() {
  quizSet = [...questions].sort(() => Math.random() - .5).slice(0, 8);
  questionIndex = 0; score = 0; answered = false; renderQuestion();
}
function renderQuestion() {
  const current = quizSet[questionIndex];
  $('#quiz-module').textContent = current.module;
  $('#quiz-progress').textContent = `Question ${questionIndex + 1} of ${quizSet.length}`;
  $('#quiz-meter-fill').style.width = `${((questionIndex + 1) / quizSet.length) * 100}%`;
  $('#quiz-question').textContent = current.q;
  $('#quiz-options').innerHTML = current.choices.map((choice,index) => `<button class="quiz-option" data-option="${index}"><span class="option-letter">${String.fromCharCode(65 + index)}</span>${choice}</button>`).join('');
  $('#quiz-feedback').hidden = true;
  $('#next-question').disabled = true;
  $('#next-question').innerHTML = questionIndex === quizSet.length - 1 ? 'Finish and restart <span>↻</span>' : 'Next question <span>→</span>';
  $('#score').innerHTML = `${score}<span>/ ${quizSet.length}</span>`;
  document.querySelectorAll('.quiz-option').forEach(button => button.addEventListener('click', () => selectAnswer(Number(button.dataset.option))));
}
function selectAnswer(choice) {
  if (answered) return;
  answered = true;
  const current = quizSet[questionIndex];
  const correct = choice === current.answer;
  if (correct) score += 1;
  document.querySelectorAll('.quiz-option').forEach(button => { const index = Number(button.dataset.option); button.disabled = true; if (index === current.answer) button.classList.add('correct'); if (index === choice && !correct) button.classList.add('wrong'); });
  const feedback = $('#quiz-feedback'); feedback.hidden = false; feedback.innerHTML = `<b>${correct ? 'Correct — nice route!' : 'Not quite — remember this route.'}</b><br>${current.explain}`;
  $('#score').innerHTML = `${score}<span>/ ${quizSet.length}</span>`;
  $('#next-question').disabled = false;
}

document.addEventListener('click', event => {
  const viewLink = event.target.closest('[data-view]');
  if (viewLink) { event.preventDefault(); switchView(viewLink.dataset.view); }
  if (event.target.closest('[data-open-route]')) openRoute();
});
$('#command-search').addEventListener('input', renderCommands);
$('#next-question').addEventListener('click', () => { if (questionIndex === quizSet.length - 1) startQuiz(); else { questionIndex += 1; answered = false; renderQuestion(); } });
$('#focus-button').addEventListener('click', () => document.body.classList.toggle('focus'));
$('#menu-button').addEventListener('click', () => document.querySelector('.app-shell').classList.toggle('menu-open'));
$('.dialog-close').addEventListener('click', () => $('#route-dialog').close());
$('#route-dialog').addEventListener('click', event => { if (event.target === $('#route-dialog')) $('#route-dialog').close(); });

$('#command-total').textContent = commands.length;
$('#question-total').textContent = questions.length;
renderModules();
renderCommands();
startQuiz();
