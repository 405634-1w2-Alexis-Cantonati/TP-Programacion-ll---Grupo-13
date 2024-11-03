using Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back.Repositories
{
    public interface IMascotaRepository
    {
        public bool Create(Mascota obj);
        public bool Update(Mascota obj);
        public bool Delete(int id);
        public Mascota? GetById(int id);
        public List<Mascota> GetAll();
    }
}
