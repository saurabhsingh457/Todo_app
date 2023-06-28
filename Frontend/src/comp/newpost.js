import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = () => {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTitle, setSearchTitle] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3500/get');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post('http://localhost:3500/post', {
        title,
        description,
      });
      console.log('User created:', response.data);
      setTitle('');
      setDescription('');
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const updateUser = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3500/update/${id}`, {
        title,
        description,
      });
      console.log('User updated:', response.data);
      setTitle('');
      setDescription('');
      setSelectedUserId(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3500/delete/${id}`);
      console.log('User deleted:', response.data);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (id) => {
    const user = users.find((user) => user._id === id);
    setTitle(user.title);
    setDescription(user.description);
    setSelectedUserId(id);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setSelectedUserId(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3500/search?title=${searchTitle}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  return (
    <div style={styles.container}>
      <div style={styles.creates}>
        <h2 style={styles.heading}>Create Post</h2>
        <form onSubmit={createUser} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title:</label>
            <input type="text" required
             onChange={(e) => setTitle(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textarea}
            />
          </div>
          <button type="submit" style={styles.button}>Create</button>
        </form>
      </div>
      <div style={styles.usersList}>
        <h2 style={styles.heading}>All Posts</h2>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            value={searchTitle}
            onChange={handleChange}
            placeholder="Search by title"
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>Search</button>
        </form>
        <ul style={styles.userList}>
          {users.map((user) => (
            <li key={user._id} style={styles.userItem}>
              <p style={styles.title}>
                <strong>Title: </strong>
                {user.title}
              </p>
              <p style={styles.description}>
                <strong>Description: </strong>
                {user.description}
              </p>
              <div style={styles.buttonGroup}>
                <button onClick={() => handleEdit(user._id)} style={styles.editButton}>Edit</button>
                <button onClick={() => deleteUser(user._id)} style={styles.deleteButton}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedUserId && (
        <div style={styles.editUser}>
          <h2 style={styles.heading}>Edit User</h2>
          <form onSubmit={() => updateUser(selectedUserId)} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
              />
            </div>
            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.button}>Update</button>
              <button onClick={handleCancel} style={styles.button}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '16px',
    color: '#333',
  },
  form: {
    marginBottom: '16px',
  },
  formGroup: {
    marginBottom: '8px',
  },
  label: {
    display: 'block',
    marginBottom: '4px',
    color: '#555',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px',
  },
  userList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  userItem: {
    backgroundColor: '#f4f4f4',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    width: '400px',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  description: {
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
  },
  editButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    marginRight: '10px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  searchForm: {
    marginBottom: '16px',
  },
  searchInput: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '8px',
  },
  searchButton: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  creates:{
    position:"fixed",
    margin:"20px 20px 20px 20px",
    top:"20px",
    left:"20px",
  },
  usersList:{
    position:"relative",
    right:"20px",
    left:"150px",
  },
  editUser:{
    position:"fixed",
    margin:"280px 20px 20px 20px",
    top:"20px",
    left:"20px",
  },
};

export default Post;
