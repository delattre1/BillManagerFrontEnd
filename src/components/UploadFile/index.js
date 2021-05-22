// Reference: https://www.pluralsight.com/guides/uploading-files-with-reactjs
import React, {useState, useRef} from 'react';
import axios from 'axios';
import './form.css'
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function FileUpload(){
	const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const inputFile = useRef(null) 

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
	};

  const onButtonClick = () => {
    inputFile.current.click();
  }

	const handleSubmission = () => {
		const formData = new FormData();
    const url = "http://localhost:8000/api/boleto/"

		formData.append('File', selectedFile);

    axios.post(url, formData)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return(
   <div className="formContainer">
      <input type="file" name="file" onChange={changeHandler} ref={inputFile} style={{display: 'none'}}/>

      <Button
        variant="contained"
        color="default"
        startIcon={<CloudUploadIcon />}
        onClick={onButtonClick}
      >
        Upload
      </Button>

      {isFilePicked ? (
        <div>
          <p>Selecionado: {selectedFile.name}</p>
        </div>
      ) : (
        <p>Nenhum arquivo selecionado :(</p>
      )}

      <Button className="sendButton" variant="contained" color="primary">
        Enviar
      </Button>
		</div>
	)
};
export default FileUpload
