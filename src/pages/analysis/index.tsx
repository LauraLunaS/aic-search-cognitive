import Search from '@/components/Search';

const SearchNameGetPaciente = () => {
    return <Search apiUrl="/api/getNamePaciente" placeholderText="Pesquisar paciente" />;
  };
  
  export default SearchNameGetPaciente;