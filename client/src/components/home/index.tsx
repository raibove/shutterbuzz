import { useState } from 'react';
import './styles.css'

const Home = () => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');


  const handleSubmit = async () => {
    if (!uploadFile) return;
    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('description', description);

    try {
      const response = await fetch('https://shutterbuzz.netlify.app/.netlify/functions/test', {
        method: 'POST',
        body: formData,
      });
      console.log(response)
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
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
      </div>
    </div>
  )
}

export default Home;