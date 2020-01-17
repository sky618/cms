﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Datory;


namespace SiteServer.Abstractions
{
    public interface ILibraryGroupRepository : IRepository
    {
        Task<int> InsertAsync(LibraryGroup group);

        Task<bool> UpdateAsync(LibraryGroup group);

        Task<bool> DeleteAsync(LibraryType type, int groupId);

        Task<List<LibraryGroup>> GetAllAsync(LibraryType type);

        Task<bool> IsExistsAsync(LibraryType type, string groupName);
    }
}