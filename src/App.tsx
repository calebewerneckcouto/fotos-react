import * as C from './App.styles';
import { useState, useEffect, FormEvent } from 'react';
import * as Photos from './services/photos';
import { Photo } from './types/Photo';
import PhotoItem from './components/PhotoItem';
import { DeleteButton } from './components/PhotoItem/styles';

interface PhotoError {
  name: string;
  message: string;
}

const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      try {
        setPhotos(await Photos.getAll());
      } catch (error) {
        console.error('Error fetching photos:', error);
        // Handle error gracefully (e.g., display user-friendly message)
      } finally {
        setLoading(false);
      }
    };

    getPhotos();
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if (file && file.size > 0) {
      setUploading(true);

      try {
        const result = await Photos.insert(file);
        setPhotos([...photos, result as Photo]); // Not recommended unless necessary

      } catch (error) {
        const photoError = error as PhotoError; // Handle potential PhotoError type
        alert(`${photoError.name} - ${photoError.message}`);
      } finally {
        setUploading(false);
      }
    }
  };

  const handlePhotoDelete = async (photo: Photo) => {
    try {
      await Photos.deletePhoto(photo.url); // Assuming deletePhoto takes URL
      setPhotos(photos.filter((item) => item.url !== photo.url));
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Erro ao deletar a foto!'); // User-friendly error message
    }
  };

  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de Fotos</C.Header>

        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading && 'Enviando...'}
        </C.UploadForm>

        {loading && (
          <C.ScreenWarning>
            <div className="emoji">✋</div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        )}

        {!loading && photos.length > 0 && (
          <C.PhotoList>
            {photos.map((photo, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img src={photo.url} alt={photo.name} />
                <DeleteButton
                 
                  onClick={() => {
                    if (window.confirm('Deseja realmente excluir esta foto?')) {
                      handlePhotoDelete(photo);
                    }
                  }}
                >
                  Excluir
                </DeleteButton>
              </div>
            ))}
          </C.PhotoList>
        )}

        {!loading && photos.length === 0 && (
          <C.ScreenWarning>
            <div className="emoji">😔</div>
            <div>Não há fotos cadastradas</div>
          </C.ScreenWarning>
        )}
      </C.Area>
    </C.Container>
  );
};

export default App;
