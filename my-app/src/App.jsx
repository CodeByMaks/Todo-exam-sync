import './App.css';
import edit from './assets/EditFilled.png';
import deletedIcon from './assets/DeleteFilled.png';
import { useState } from 'react';
import clear from './assets/clear.png';

function App() {
  const [data, setData] = useState([
    {
      id: 1,
      task: "The first task tittle",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet euismod nulla.',
      status: false,
    },
    {
      id: 2,
      task: "My tasks",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet euismod nulla.',
      status: false,
    },
    {
      id: 3,
      task: "The first task tittle",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet euismod nulla.',
      status: false,
    },
    {
      id: 4,
      task: "The first task tittle",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet euismod nulla.',
      status: false,
    },
    {
      id: 5,
      task: "The first task tittle",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet euismod nulla.',
      status: false,
    },
    {
      id: 6,
      task: "The first task tittle",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet euismod nulla.',
      status: false,
    }
  ])
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  function deleteTask(id){
    setData(data.filter((el) => el.id != id));
  }

  function toogleChange(id){
    setData(data.map((el) => el.id == id ? {...el, status: !el.status} : el))
  }

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  
  const openEditDialog = (task) => {
    setEditTask(task);
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditTask(null);
    setIsEditDialogOpen(false);
  };

  const handleSaveTask = () => {
    const newTask = { id: Date.now(), task: taskName, status: false, description:  description};
    setData([...data, newTask]);
    setTaskName('');
    closeDialog();
  }

  const handleEditChange = (e) => {
    setEditTask({ ...editTask, task: e.target.value });
  };

  const handleEditDescriptionChange = (e) => {
    setEditTask({ ...editTask, description: e.target.value });
  };

  const handleSaveEditedTask = () => {
    setData(data.map(task => task.id === editTask.id ? editTask : task));
    closeEditDialog();
  };
  

  const filteredData = data.filter(e => {
    const inSearch = e.task.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.id.toString().includes(searchQuery);
    const inStatus = !statusFilter || 
      (statusFilter === 'done' && e.status) || 
      (statusFilter === 'notdone' && !e.status);
    return inSearch && inStatus;
  });

  return (
    <>
    <dialog className='addModal' open={isDialogOpen}>
        <div className='main-modal'>
          <div className='task-exit'>
            <h1>TASK</h1>
            <img className='exit' src={clear} onClick={closeDialog} alt="" />
          </div>
          <div className='inp-title'>
            <p>Title</p>
            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder='Placeholder text' name="" id="" />
          </div>
          <div className='inp-title'>
            <p>Description</p>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="" id="" placeholder='Placeholder text'></textarea>
          </div>

          <div className='btn-tools'>
            <button onClick={handleSaveTask} className='save'>Save</button>
            <button onClick={closeDialog}>Cancel</button>
          </div>
        </div>
    </dialog>

    <dialog className='editModal' open={isEditDialogOpen}>
  <div className='main-modal'>
    <div className='task-exit'>
      <h1>Edit Task</h1>
      <img className='exit' src={clear} onClick={closeEditDialog} alt="Close" />
    </div>
    <div className='inp-title'>
      <p>Title</p>
      <input 
        type="text"  
        value={editTask?.task || ''} 
        onChange={handleEditChange} 
        placeholder='Placeholder text'
      />
    </div>
    <div className='inp-title'>
      <p>Description</p>
      <textarea 
        value={editTask?.description || ''}  
        onChange={handleEditDescriptionChange} 
        placeholder='Placeholder text'
      ></textarea>
    </div>
    <div className='btn-tools'>
      <button onClick={handleSaveEditedTask} className='save'>Save</button>
      <button onClick={closeEditDialog}>Cancel</button>
    </div>
  </div>
</dialog>


    <div className='menu'>
      <h1>Todo</h1>
      <div className='menu-tools'>
        <select name="" id="" onChange={handleStatusChange}>
          <option value="">All</option>
          <option value="done">Done</option>
          <option value="notdone">Not Done</option>
        </select>
        <input type="search" value={searchQuery} onChange={handleSearch} placeholder='Name task...' />
        <p onClick={openDialog}>+</p>
      </div>
    </div>

    <div className='main'>
      <div className='list-menu'>
          <div className='list-example'>
            <div className='circle'></div>
            <h2>work</h2>
          </div>
          <div className='list-example'>
            <div className='colOne'></div>
            <h2>study</h2>
          </div>
          <div className='list-example'>
            <div className='colTwo'></div>
            <h2>entertainment</h2>
          </div>
          <div className='list-example'>
            <div className='colOne'></div>
            <h2>family</h2>
          </div>
          <div className='hideDone'>
            <input type="checkbox" />
            <p>Hide done Task</p>
          </div>
      </div>

      <div className='main-box'>
        {filteredData.length > 0 && filteredData.map((e)=> {
          return (
          <div className='item-box' key={e.id}>
              <h3 className={e.status ? "check" : "notCkeck"}>{e.task}</h3>
              <p className='descript'>{e.description}</p>
              <div className='tool-flex'>
                <div className='buttons-style'>
                <button onClick={() => openEditDialog(e)}><img src={edit} alt="" /></button>
                  <button onClick={() => deleteTask(e.id)}><img src={deletedIcon} alt="" /></button>
                </div>
                <div className='inp-flex'>
                  <input type="checkbox" onChange={() => toogleChange(e.id)} />
                  <p>{e.status ? "done" : "not done"}</p>
                </div>
              </div>
          </div>
          )
        })}
      </div>
    </div>
    </>
  )
}

export default App
