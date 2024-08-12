package io.akitect.crm.service;

import io.akitect.crm.model.Setting;

import java.util.List;
import java.util.Optional;

public interface SettingService {

    List<Setting> getAllSettings();

    Optional<Setting> getSettingById(Long id);

    Optional<Setting> getSettingByKey(String key);

    Setting createSetting(Setting setting);

    Optional<Setting> updateSetting(Long id, Setting updatedSetting);

    void deleteSetting(Long id);
}
