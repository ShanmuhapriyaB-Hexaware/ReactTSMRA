import styled from '@emotion/styled';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 4rem auto;
    grid-template-rows: 4rem auto;
    
    #layout__header {
        grid-column: 2 / -1;
        grid-row: 1 / 2;
        height: 4rem;
    }
    
    #layout__navbar {
        grid-row: 2 / -1;
        grid-column: 1 / 2;
    }
    
    #layout__container {
        grid-row: 2 / -1;
        grid-column: 2 / -1;
        padding: 0.5rem 1rem;
        grid-auto-flow: column;
        width: 100%;
    }`;

export default Wrapper;