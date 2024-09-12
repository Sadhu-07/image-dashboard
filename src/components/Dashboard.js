// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [ocrData, setOcrData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOcrData();
  }, []);

  const fetchOcrData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/images');
      setOcrData(response.data);
    } catch (error) {
      console.error('Error fetching OCR data', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: (acceptedFiles) => {
      const filePreviews = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(filePreviews);
      uploadImages(filePreviews);
    },
  });

  const uploadImages = (files) => {
    setLoading(true);
    const promises = files.map((file) => {
      const formData = new FormData();
      formData.append('image', file);

      return axios.post('http://localhost:5000/upload', formData)
        .then(response => {
          return response.data.newImage;
        });
    });

    Promise.all(promises).then((results) => {
      setOcrData([...ocrData, ...results]);
      setLoading(false);
    });
  };

  const handleFileDelete = (id) => {
    // Update OCR data by removing the deleted file's data
    const updatedOcrData = ocrData.filter(data => data._id !== id);
    setOcrData(updatedOcrData);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Image Dashboard
      </Typography>
      <Paper {...getRootProps()} style={{ padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
        <input {...getInputProps()} />
        <Typography variant="body1">Drag & drop some files here, or click to select files</Typography>
      </Paper>
      {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
          <Typography variant="body1">Processing images...</Typography>
        </div>
      )}
      {!loading && ocrData.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Preview</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Extracted Text</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ocrData.map((data) => (
                <TableRow key={data._id}>
                  <TableCell>
                    <img src={`http://localhost:5000/uploads/${data.filename}`} alt={data.filename} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  </TableCell>
                  <TableCell>{data.filename}</TableCell>
                  <TableCell>{data.text}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => handleFileDelete(data._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Dashboard;
