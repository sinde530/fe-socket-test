import styled from '@emotion/styled';

export const Container = styled.div({
    maxWidth: '1250px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
});
export const PaddingTopBox = styled.div({
    width: '100%',
    padding: '7rem 16px',
    textAlign: 'center',
});
export const NickName = styled.input({
    fontSize: '20px',
});
export const AutoBox = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '4rem',
});
export const RoomsText = styled.p({
    fontSize: '30px',
});
export const RoomsBox = styled.div({
    paddingTop: '3rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
});
export const RoomCard = styled.div({
    backgroundColor: '#f35b5b',
    padding: '1rem',
    borderRadius: '8px',
});
export const RoomTitle = styled.p({
    fontSize: '18px',
    fontWeight: 'bold',
});
export const RoomInfo = styled.p({
    paddingTop: '8px',
    fontSize: '14px',
    color: '#000',
});

export const ModalWrapper = styled.div({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

export const ModalContent = styled.div({
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '400px',
});

export const ModalTitle = styled.div({
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '1rem',
});

export const ModalInput = styled.input({
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
});

export const ModalButton = styled.button({
    display: 'block',
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#f35b5b',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: '#d14242',
    },
    '& + button': {
        marginTop: '0.5rem',
    },
});
