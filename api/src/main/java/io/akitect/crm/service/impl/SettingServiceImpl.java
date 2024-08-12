package io.akitect.crm.service.impl;

import io.akitect.crm.model.Setting;
import io.akitect.crm.repository.impl.SettingRepositoryImpl;
import io.akitect.crm.service.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SettingServiceImpl implements SettingService {

    private final SettingRepositoryImpl settingRepository;

    @Autowired
    public SettingServiceImpl(SettingRepositoryImpl settingRepository) {
        this.settingRepository = settingRepository;
    }

    @Override
    public List<Setting> getAllSettings() {
        return settingRepository.findAll();
    }

    @Override
    public Optional<Setting> getSettingById(Long id) {
        return settingRepository.findById(id);
    }

    @Override
    public Optional<Setting> getSettingByKey(String key) {
        return settingRepository.findByKey(key);
    }

    @Override
    public Setting createSetting(Setting setting) {
        return settingRepository.save(setting);
    }

    @Override
    public Optional<Setting> updateSetting(Long id, Setting updatedSetting) {
        return settingRepository.findById(id).map(setting -> {
            setting.setKey(updatedSetting.getKey());
            setting.setValue(updatedSetting.getValue());
            return settingRepository.save(setting);
        });
    }

    @Override
    public void deleteSetting(Long id) {
        settingRepository.deleteById(id);
    }
}
