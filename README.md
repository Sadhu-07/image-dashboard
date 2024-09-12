Here's a tailored `README.md` for your text extractor dashboard based on your previous project details:

---

# Text Extractor Dashboard

This repository contains a complete text extraction tool with a user-friendly dashboard built using React.js for the frontend and a Python-based backend with MongoDB for data storage. The tool allows users to upload images, extract text using Optical Character Recognition (OCR), and store the extracted text in a database for future retrieval. It also includes functionality for specific data extraction from identity cards using the Machine-Readable Zone (MRZ) parsing technique.

### Key Features:
- **Image Upload**: Users can upload images to extract text.
- **OCR Functionality**: Utilizes `Tesseract.js` for optical character recognition to extract text from uploaded images.
- **Identity Card Data Extraction**: Extracts specific information from identity cards using MRZ parsing.
- **Data Storage**: Stores extracted text in a MongoDB database for future access and management.
- **Dashboard Interface**: Built with React.js, allowing users to interact with uploaded images, view extracted text, and manage data.

### Technologies Used:
- **Frontend**: React.js (HTML, CSS, JavaScript)
- **Backend**: Python (Flask/Node.js with Express), Tesseract.js for OCR, MRZ parsing for identity cards
- **Database**: MongoDB for storing image and extracted text data

### Installation:

#### 1. Clone the repository:
```bash
git clone https://github.com/Sadhu-07/image-dashboard.git
```

#### 2. Frontend Setup:
Navigate to the frontend directory and install the dependencies:
```bash
cd frontend
npm install
npm start
```

#### 3. Backend Setup:
Navigate to the backend directory and install the required Python packages:
```bash
cd backend
pip install -r requirements.txt
```

Alternatively, if using Node.js for the backend, install dependencies:
```bash
npm install
npm start
```

#### 4. MongoDB Setup:
- Ensure that MongoDB is installed and running on your local machine or cloud service (e.g., MongoDB Atlas).
- Update the MongoDB connection string in the backend configuration file.

### Usage:
1. **Image Upload**: Users can upload images via the React.js dashboard.
2. **Text Extraction**: Upon uploading, the backend processes the image using `Tesseract.js` and extracts the text.
3. **Data Storage**: The extracted text is stored in MongoDB, along with metadata about the image.
4. **Identity Card Parsing**: For images of identity cards, the MRZ parser extracts relevant details.
5. **View Data**: Users can view all uploaded images and their corresponding extracted text in the dashboard.

### Project Structure:
```bash
.
├── frontend/                        # React.js frontend code
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/                         # Python/Node.js backend code
│   ├── app.py                       # Flask API (if using Python)
│   ├── server.js                    # Node.js API (if using Express)
│   └── requirements.txt/package.json # Dependencies
├── models/                          # MongoDB models for image and text data
└── README.md                        # Project documentation
```

### Endpoints:
- **POST /upload**: Upload an image to extract text.
- **GET /images**: Retrieve a list of all uploaded images and their extracted text.
- **DELETE /images/:id**: Delete an image and its associated data from the database.

### Example Workflow:
1. User uploads an image via the dashboard.
2. The backend processes the image using Tesseract.js and extracts text.
3. Extracted data is stored in MongoDB.
4. The user can view the image and extracted text on the dashboard.

### License:
This project is licensed under the MIT License.

---

This `README.md` provides a complete description of your text extraction tool, including installation, usage instructions, and the tech stack used for both the frontend and backend.
