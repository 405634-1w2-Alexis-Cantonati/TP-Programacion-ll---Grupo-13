using Back.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        private VETERINARIAContext _context;
        public ClienteRepository(VETERINARIAContext context)
        {
            _context = context;
        }
        public Cliente Create(Cliente obj)
        {
            if (obj != null)
            {
                _context.Clientes.Add(obj);
                _context.SaveChanges();
                return obj;
            }
            return null;
        }

        public List<Cliente> GetAll()
        {
            return _context.Clientes.ToList(); 
        }
    }
}