import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [terminalLines, setTerminalLines] = useState([]);
  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const executeCommand = (command) => {
    const commands = {
      ls: ["info.txt", "skills.txt", "projects.txt", "contact.txt"],
      pwd: ["/home/ak"],
      id: ["uid=1000(ak) gid=1000(ak) groups=1000(ak),4(adm),24(cdrom),27(sudo),126(sambashare)"],
      whoami: ["ak"],
      "uname -a": ["Linux ak 5.4.0-80-generic #90-Ubuntu x86_64 GNU/Linux - Portfolio Terminal"],
      uname: ["Linux"],
      "cat info.txt": ["Name: Sujan Sharma", "Location: On, Canada", "Occupation: Computer Programmer"],
      "cat skills.txt": ["Languages: JavaScript, Python, Java, C++, C, Ruby", "Frameworks: Django, React, Node.js, Express, Flask, Ruby on Rails", "Databases: MySQL, PostgreSQL, MongoDB, SQLite", "Tools: Git, Docker, Jenkins, Travis CI, Circle CI, Heroku, AWS, GCP"],
      "cat projects.txt": ["1. Portfolio Terminal", "2. QBX", "3. Dynamic YouTube title"],
      "cat contact.txt": ["Email: sujan@brokenai.ca, sujansharma2060@gmail.com", "LinkedIn: https://www.linkedin.com/in/NotSujanSharma/", "GitHub: https://www.github.com/NotSujanSharma"],
      help: ["Available commands are: ls, cat, pwd, id, whoami, uname, clear, help"],
    };

    if (command === "clear" || command === "cls") {
      setTerminalLines([]);
    } else if (commands[command]) {
      setTerminalLines((lines) => [
        ...lines,
        `┌──(ak㉿ak)-[~]`,
        `└─$ ${command}`,
        ...commands[command],
        ` `
      ]);
    } else {
      setTerminalLines((lines) => [
        ...lines,
        `┌──(ak㉿ak)-[~]`,
        `└─$ ${command}`,
        `command not found: ${command}`,
        ` `
      ]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      executeCommand(event.target.value);
      event.target.value = '';
    }
  };

  return (
    <>
      <header>
        <nav className='flex flex-row w-100 '>
          <div className='action-buttons flex flex-row w-10'>
            <div className='closeButton round bg-red action-button'>             
            </div>
            <div className='minimizeButton round bg-yellow action-button'>          
            </div>
            <div className='maximizeButton round bg-green action-button'>             
            </div>
          </div>
          <div className='title'>NotSujanSharma/portfolio-terminal</div>
        </nav>
      </header>
      <main>
        <div className='flex flex-col align-start justify-center' id='terminal-body' ref={terminalBodyRef}>
          {terminalLines.map((line, index) => (
            <div key={index} className='terminal-line'>{line}</div>
          ))}
          <div>┌──(ak㉿ak)-[~]</div>
          <div className='flex align-start input-area'>
            <div>└─$</div>
            <input
              type="text"
              ref={inputRef}
              onKeyDown={handleKeyPress}
              placeholder='type ls to list files, cat info.txt to view info, help for more commands'
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
