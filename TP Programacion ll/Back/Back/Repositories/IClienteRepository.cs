using Back.Models;

public interface IClienteRepository
{ 
    public Cliente Create(Cliente obj);
    public List<Cliente> GetAll();
}