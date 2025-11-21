import { SettingsService } from './settings-service';
import { TranslateService } from './translate-service';

describe('SettingsService', () => {
  let service: SettingsService;
  let mockTranslateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    // Mock del TranslateService
    mockTranslateService = jasmine.createSpyObj('TranslateService', ['setLanguage']);

    // Limpiar cookies y clases antes de cada test
    document.cookie = '';
    document.body.className = '';

    // Crear instancia con el mock
    service = new SettingsService();
    (service as any).translate = mockTranslateService;
  });

  it('debería inicializar con valores por defecto', () => {
    expect(service.darkMode()).toBeFalse();
    expect(service.language()).toBe('es');
    expect(service.theme()).toBe('theme-flora');
    expect(service.rememberMe()).toBeFalse();
  });

  it('debería guardar la configuración en una cookie', () => {
    service.toggleDarkMode();
    service.setLanguageCookie('en');
    service.setRememberMe(true);
    service.saveSettings();

    expect(document.cookie).toContain('app_settings=');
    const cookie = decodeURIComponent(document.cookie.split('=')[1]);
    const parsed = JSON.parse(cookie);
    expect(parsed.darkMode).toBeTrue();
    expect(parsed.language).toBe('en');
    expect(parsed.rememberMe).toBeTrue();
  });

  it('debería alternar dark mode y modificar el DOM', () => {
    service.toggleDarkMode();
    expect(document.body.classList.contains('dark-theme')).toBeTrue();
  });

  it('debería actualizar el idioma correctamente', () => {
    service.setLanguageCookie('de');
    expect(service.language()).toBe('de');
    expect(mockTranslateService.setLanguage).toHaveBeenCalledWith('de');
  });
});