using Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back.Repositories
{
    public class tipoRepository : ITipoRepository
    {
        private VETERINARIAContext _context;
        public tipoRepository(VETERINARIAContext context)
        {
            _context = context;
        }
        public List<Tipo> GetAllTipos()
        {
            return _context.Tipos.ToList();
        }
    }
}
