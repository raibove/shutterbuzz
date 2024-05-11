import { useState } from 'react';
import './styles.css'
import * as netlifyIdentity from 'netlify-identity-widget'
import Loader from '../loader';

interface Props {
  isAuthenticated: null | string;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<string | null>>
}
const Home = ({ isAuthenticated, setIsAuthenticated }: Props) => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [todaysPrompt, setTodaysPrompt] = useState('The sky you see');
  const [loading, setLoading] = useState(false);

  const readFile = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    setMsg('')
    setErr('')
    if (!isAuthenticated) {
      setErr('You must be authenticated.')
      netlifyIdentity.init()
      netlifyIdentity.open('signup')
      netlifyIdentity.on('login', user => {
        console.log('login', user.email)
        netlifyIdentity.off('login');
        setIsAuthenticated(user.email)
        setErr('')
        setMsg('Authenticated. Pls click on submit again');
        netlifyIdentity.close();
      });
      return;
    }

    if (!uploadFile) {
      setErr('Upload file to submit for todays prompt')
      return;
    }
    // const formData = new FormData();
    // formData.append('file', uploadFile);
    // formData.append('description', description);
    // console.log(formData)


    const file = await readFile(uploadFile);
    const fileName = uploadFile.name.split('.').shift();
    const type = uploadFile.type ? uploadFile.type : 'NA';

    const currentDateUTC = new Date();
    const year = currentDateUTC.getUTCFullYear();
    const month = String(currentDateUTC.getUTCMonth() + 1).padStart(2, '0');
    const day = String(currentDateUTC.getUTCDate()).padStart(2, '0');
    const dt = year + month + day;
    const pattern = /[^a-zA-Z0-9]/g;
    const user = isAuthenticated.replace(pattern, '');

    const metaData = {
      name: fileName,
      type: type,
      description: description || todaysPrompt,
    }

    const payload = {
      date: dt,
      user: user,
      file: file,
      metaData: metaData
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8888/.netlify/functions/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Specify that the content type is JSON
        },
        body: JSON.stringify(payload) // Convert the payload object to a JSON string
      });
      
      console.log(response.status )
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='today-prompt'>
        Today's prompt: {todaysPrompt}
      </div>
      <div className="file-upload-container">
        {loading && <Loader />}
        <h2 className="upload-title">Upload your masterpiece</h2>
        <div className="input-container">
          <input type="file" id="fileInput" className="custom-file-input" onChange={(e) => {
            const file = e.target.files![0];
            setUploadFile(file);
            if (err) {
              setErr('')
              setMsg('File Uploaded Successfully, please click on submit')
            }
          }} />
          <label htmlFor="fileInput" className="custom-file-label">Choose File</label>
        </div>
        <div className="input-container">
          <input type="text" id="descriptionInput" className="description-input" placeholder="Enter description..." value={description} onChange={(e) => { setDescription(e.target.value) }} />
        </div>
        <div className="button-container">
          <button className="primary-button" onClick={handleSubmit}>Submit</button>
          <button className="secondary-button">Cancel</button>
        </div>
        <div className='err-container'>{err}</div>
        <div>{msg}</div>
      </div>
    </div>
  )
}

export default Home;