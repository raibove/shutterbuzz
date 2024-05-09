import './styles.css'

const Home = ()=>{
    return (
        <div>
   <div className="file-upload-container">
      <h2 className="upload-title">Upload your masterpiece</h2>
      <div className="input-container">
        <input type="file" id="fileInput" className="custom-file-input" />
        <label htmlFor="fileInput" className="custom-file-label">Choose File</label>
      </div>
      <div className="input-container">
        <input type="text" id="descriptionInput" className="description-input" placeholder="Enter description..." />
      </div>
      <div className="button-container">
        <button className="primary-button">Submit</button>
        <button className="secondary-button">Cancel</button>
      </div>
    </div>
        </div>
    )
}

export default Home;