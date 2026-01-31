import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  // Initialize Google Fonts for web
  GoogleFonts.config.allowRuntimeFetching = true;
  
  // Set system font fallback for emoji
  SystemChannels.platform.invokeMethod('SystemChrome.setApplicationSwitcherDescription', {
    'label': 'Brainura',
    'primaryColor': 0xFF6750A4,
  });
}
