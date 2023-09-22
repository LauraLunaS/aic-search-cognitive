import { useState } from 'react';
import { debounce } from 'lodash';
import { Container, Form, InputText, ContainerResult, Result } from './style'

const SearchName: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleSearch = debounce(async () => {
    try {
      setIsLoading(true);

      if (isEmpty) {
        setResults([]);
        return;
      }

      const response = await fetch(`/api/submitName?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.names && data.names.length === 0) { 
        setResults(["Busca não encontrada"]);
      } else {
        setResults(data.names || []);
      }
      
    } catch (error) {
      console.error('Erro ao buscar nome:', error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    
    setIsEmpty(!value.trim());

    handleSearch();
  };

  return (
    <Container>
      <Form>
        <InputText
          type="text"
          value={query}
          onChange={handleChange} 
          placeholder="Pesquisar..."
          required
        />
      </Form>
      <ContainerResult>
        {isLoading ? (
          <p>Carregando...</p> 
        ) : isEmpty ? null : (
          results.map((name, index) => (
            <Result key={index}>{name}</Result>
          ))
        )}
      </ContainerResult>
    </Container>
  );
};

export default SearchName;
