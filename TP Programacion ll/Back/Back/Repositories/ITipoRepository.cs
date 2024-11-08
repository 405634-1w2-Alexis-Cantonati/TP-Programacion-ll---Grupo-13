using Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back.Repositories
{
    public interface ITipoRepository
    {
       public List<Tipo> GetAllTipos();
    }
}
