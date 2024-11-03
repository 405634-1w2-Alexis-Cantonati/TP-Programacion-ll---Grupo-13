using Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back.Repositories
{
    public class AtencionRepository : IAtencionRepository
    {
        private VETERINARIAContext _context;
        public AtencionRepository(VETERINARIAContext context)
        {
            _context = context;
        }
        public bool Create(Atencion obj)
        {
            if (obj != null && GetById(Convert.ToInt32(obj.IdAtencion)) == null)
            {
                _context.Atencions.Add(obj);
                return _context.SaveChanges() > 0;
            }
            return false;
        }

        public bool Delete(int id)
        {
            var obj = GetById(id);
            if (obj != null)
            {
                _context.Atencions.Remove(obj);
                return _context.SaveChanges() > 0;
            }
            return false;
        }

        public List<Atencion> GetAll()
        {
            return _context.Atencions.ToList();
        }

        public Atencion? GetById(int id)
        {
            return _context.Atencions.Find(id);
        }

        public bool Update(Atencion obj)
        {
            if (obj != null)
            {
                _context.Atencions.Update(obj);
                return _context.SaveChanges() > 0;
            }
            return false;
        }
    }
}
