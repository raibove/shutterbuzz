import { useState } from 'react';
import './styles.css'
import * as netlifyIdentity from 'netlify-identity-widget'

interface Props {
  isAuthenticated: null | string;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<string | null>>
}
const Home = ({ isAuthenticated, setIsAuthenticated }: Props) => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

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
    const lastModified = uploadFile.lastModified;
    const metaData = {
      name: fileName,
      type: type,
      lastModified: new Date(lastModified)
    }

    const payload = {
      fileName: fileName,
      file: file,
      metaData: metaData
    }

    try {
      const response = await fetch('http://localhost:8888/.netlify/functions/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Specify that the content type is JSON
        },
        body: JSON.stringify(payload) // Convert the payload object to a JSON string
      });
      console.log(response, response.body
      )
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <div className='today-prompt'>
        Today's prompt: The sky you see
      </div>
      <div className="file-upload-container">
        <h2 className="upload-title">Upload your masterpiece</h2>
        <div className="input-container">
          <input type="file" id="fileInput" className="custom-file-input" onChange={(e) => {
            const file = e.target.files![0];
            setUploadFile(file);
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