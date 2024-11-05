using Back.Models;
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
        public bool Create(Cliente obj)
        {
            if (obj != null)
            {
                _context.Clientes.Add(obj);
                return _context.SaveChanges() > 0;
            }
            return false;
        }
    }
}