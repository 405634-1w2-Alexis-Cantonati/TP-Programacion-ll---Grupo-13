using Back.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back.Repositories
{
    public class MascotaRepository : IMascotaRepository
    {
        private VETERINARIAContext _context;
        public MascotaRepository(VETERINARIAContext context)
        {
            _context = context;
        }
        public bool Create(Mascota obj)
        {
            if (obj != null && GetById(Convert.ToInt32(obj.IdMascota)) == null)
            {
                _context.Mascotas.Add(obj);
                return _context.SaveChanges() > 0;
            }
            return false;
        }

        public bool Delete(int id)
        {
            var obj = GetById(id);
            if (obj != null)
            {
                _context.Mascotas.Remove(obj);
                return _context.SaveChanges() > 0;
            }
            return false;
        }

        public List<Mascota> GetAll()
        {
            return _context.Mascotas.ToList();
        }

        public Mascota? GetById(int id)
        {
            return _context.Mascotas.Find(id);
        }

        public bool Update(Mascota obj)
        {
            if (obj != null)
            {
                _context.Mascotas.Update(obj);
                return _context.SaveChanges() > 0;
            }
            return false;
        }
    }
}
