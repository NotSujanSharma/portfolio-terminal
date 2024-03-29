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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const content = event.target.value;
      let newLines = [...terminalLines];
      if (content === "clear" || content === "cls") {
        newLines = [];
      } else {
        newLines.push(`┌──(ak㉿ak)-[~]`);
        newLines.push(`└─$ ${content}`);
        
        
        if (content === "ls") {
          newLines = [...newLines, "info.txt", "skills.txt", "projects.txt", "contact.txt"];
        }

        else if (content === "pwd") {
          newLines = [...newLines, "/home/ak"];
        }
        else if (content === "id") {
          newLines = [...newLines, "uid=1000(ak) gid=1000(ak) groups=1000(ak),4(adm),24(cdrom),27(sudo),126(sambashare)"];
        }

        else if (content === "whoami") {
          newLines = [...newLines, "ak"];
        }

        else if (content === "uname -a") {
          newLines = [...newLines, "Linux ak 5.4.0-80-generic #90-Ubuntu x86_64 GNU/Linux - Portfolio Terminal"];
        }

        else if (content === "uname") {
          newLines = [...newLines, "Linux"];
        }

        else if (content === "cat info.txt") {
          newLines = [...newLines, "Name: Sujan Sharma", "Location: On, Canada", "Occupation: Computer Programmer"];
        }

        else if (content === "cat skills.txt") {
          newLines = [...newLines, "Languages: JavaScript, Python, Java, C++, C, Ruby", "Frameworks: Django, React, Node.js, Express, Flask, Ruby on Rails", "Databases: MySQL, PostgreSQL, MongoDB, SQLite", "Tools: Git, Docker, Jenkins, Travis CI, Circle CI, Heroku, AWS, GCP"];
        }

        else if (content === "cat projects.txt") {
          newLines = [...newLines, "1. Portfolio Terminal", "2. QBX", "3. Dynamic YouTube title"];
        }

        else if (content === "cat contact.txt") {
          newLines = [...newLines, "Email: sujan@brokenai.ca, sujansharma2060@gmail.com", "LinkedIn: https://www.linkedin.com/in/NotSujanSharma/", "GitHub: https://www.github.com/NotSujanSharma"];
        }

        else if (content === "help") {
          newLines = [...newLines, "Available commands are: ls, cat, pwd, id, whoami, uname, clear, help"];
        }
          
          else {
            newLines = [...newLines, `command not found: ${content}`];
          }
        newLines.push(` `);
      }
      

      setTerminalLines(newLines);
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
          <div className='title'>sujansharma2060/portfolio-terminal</div>
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
