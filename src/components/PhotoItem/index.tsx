import React from 'react';
import { Photo } from '../../types/Photo';
import { Container, DeleteButton } from './styles';

interface PhotoItemProps {
  url: string;
  name: string;
  onDelete?: (photo: Photo) => void; // Optional delete function prop
}

const PhotoItem: React.FC<PhotoItemProps> = ({ url, name, onDelete }) => {
  return (
    <Container>
      <img src={url} alt={name} />
      {onDelete && (
        <DeleteButton onClick={() => {
          if (window.confirm('Deseja realmente excluir esta foto?')) {
            onDelete({ url, name }); // Pass photo object to delete function
          }
        }}>
          Excluir
        </DeleteButton>
      )}
    </Container>
  );
};

export default PhotoItem;
